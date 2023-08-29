import {type SerializedRole, type SerializedRoleBasic, type SerializedRoles} from '..';
import {SheetBuilderError} from '../../errors/SheetBuilderError';
import {AddFixedModifierToLifePoints} from '../Action/AddFixedModifierToLifePoints';
import {AddPerLevelModifierToLifePoints} from '../Action/AddPerLevelModifierToLifePoints';
import {AddPerLevelModifierToManaPoints} from '../Action/AddPerLevelModifierToManaPoints';
import {AddProficiency} from '../Action/AddProficiency';
import {ApplyRoleAbility} from '../Action/ApplyRoleAbility';
import {TrainSkill} from '../Action/TrainSkill';
import {FixedModifier} from '../Modifier/FixedModifier/FixedModifier';
import {PerLevelModifier} from '../Modifier/PerLevelModifier/PerLevelModifier';
import {Level} from '../Sheet/Level';
import type {Proficiency} from '../Sheet/Proficiency';
import {type TransactionInterface} from '../Sheet/TransactionInterface';
import type {SkillName} from '../Skill/SkillName';
import {type RoleAbilitiesPerLevel} from './RoleAbilitiesPerLevel';
import type {RoleInterface, SelectSkillGroup} from './RoleInterface';
import type {RoleName} from './RoleName';

export abstract class Role<
	S extends SerializedRoles = SerializedRoles,
> implements RoleInterface<S> {
	static startsWithArmor = true;

	static serializeBasic(role: Role): SerializedRoleBasic {
		return {
			abilities: Object.values(role.abilitiesPerLevel)
				.flatMap(levelAbilities => Object.values(levelAbilities)
					.map(roleAbility => roleAbility.serialize())),
			initialLifePoints: role.initialLifePoints,
			lifePointsPerLevel: role.lifePointsPerLevel,
			manaPerLevel: role.manaPerLevel,
			mandatorySkills: role.mandatorySkills,
			proficiencies: role.proficiencies,
			selectSkillGroups: role.selectSkillGroups,
			startsWithArmor: role.startsWithArmor,
			totalInitialSkills: role.getTotalInitialSkills(),
			name: role.name,
			chosenSkills: role.chosenSkills,
		};
	}

	abstract readonly initialLifePoints: number;
	abstract readonly lifePointsPerLevel: number;
	abstract readonly manaPerLevel: number;
	abstract readonly mandatorySkills: SkillName[];
	abstract readonly proficiencies: Proficiency[];
	abstract readonly name: RoleName;
	abstract readonly abilitiesPerLevel: RoleAbilitiesPerLevel;

	get startsWithArmor() {
		return true;
	}

	/**
 * Returns an instance of this role.
 * @param chosenSkills - Chosen role skills to be trained
  **/

	constructor(
		readonly chosenSkills: SkillName[],
		readonly selectSkillGroups: SelectSkillGroup[],
	) {
		this.validateChosenSkills();
	}

	addToSheet(transaction: TransactionInterface): void {
		this.addLifePointsModifiers(transaction);
		this.addManaPointsModifiers(transaction);
		this.trainSkills(transaction);
		this.addProficiencies(transaction);
		this.addLevelOneAbilities(transaction);
	}

	addLevelOneAbilities(transaction: TransactionInterface) {
		const abilities = this.abilitiesPerLevel[Level.one];

		Object.values(abilities).forEach(ability => {
			transaction.run(new ApplyRoleAbility({
				payload: {
					ability,
					source: this.name,
				},
				transaction,
			}));
		});
	}

	getTotalInitialSkills(): number {
		return this.mandatorySkills.length + this.selectSkillGroups.reduce((acc, curr) => curr.amount + acc, 0);
	}

	serialize(): SerializedRole<S> {
		return {
			...Role.serializeBasic(this),
			...this.serializeSpecific(),
		};
	}

	protected abstract serializeSpecific(): S;

	private addLifePointsModifiers(transaction: TransactionInterface) {
		transaction.run(new AddFixedModifierToLifePoints({
			payload: {
				modifier: new FixedModifier(this.name, this.initialLifePoints, new Set(['constitution'])),
			},
			transaction,
		}));

		transaction.run(new AddPerLevelModifierToLifePoints({
			payload: {
				modifier: new PerLevelModifier({
					source: this.name,
					value: this.lifePointsPerLevel,
					includeFirstLevel: false,
					attributeBonuses: new Set(['constitution']),
				}),
			},
			transaction,
		}));
	}

	private addManaPointsModifiers(transaction: TransactionInterface) {
		transaction.run(new AddPerLevelModifierToManaPoints({
			payload: {
				modifier: new PerLevelModifier({
					source: this.name,
					value: this.manaPerLevel,
					includeFirstLevel: true,
				}),
			},
			transaction,
		}));
	}

	private addProficiencies(transaction: TransactionInterface): void {
		this.proficiencies.forEach(proficiency => {
			transaction.run(new AddProficiency({
				payload: {
					proficiency,
					source: this.name,
				},
				transaction,
			}));
		});
	}

	private trainSkills(transaction: TransactionInterface): void {
		this.mandatorySkills.forEach(skill => {
			transaction.run(new TrainSkill({
				payload: {
					skill,
					source: this.name,
				},
				transaction,
			}));
		});

		this.chosenSkills.forEach(skill => {
			transaction.run(new TrainSkill({
				payload: {
					skill,
					source: this.name,
				},
				transaction,
			}));
		});
	}

	private validateChosenSkills() {
		const isSomeRepeated = this.chosenSkills.some((skill, index) => this.chosenSkills.indexOf(skill) !== index);

		if (isSomeRepeated) {
			throw new SheetBuilderError('REPEATED_ROLE_SKILLS');
		}

		const chosenSkills = this.chosenSkills.slice();
		const groupCounters: number[] = [];

		this.selectSkillGroups.forEach(group => {
			let groupCounter = group.amount;

			for (let index = 0; index <= group.skills.length; index += 1) {
				const groupSkill = group.skills[index];
				const foundIndex = chosenSkills.findIndex(chosen => chosen === groupSkill);

				if (foundIndex >= 0) {
					groupCounter -= 1;
					chosenSkills.splice(foundIndex, 1);

					if (groupCounter === 0) {
						break;
					}
				}
			}

			groupCounters.push(groupCounter);
		});

		if (chosenSkills.length) {
			throw new SheetBuilderError('INVALID_CHOSEN_SKILLS');
		}

		if (groupCounters.some(counter => counter !== 0)) {
			throw new SheetBuilderError('MISSING_ROLE_SKILLS');
		}
	}
}
