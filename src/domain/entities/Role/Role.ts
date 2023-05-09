import {AddFixedModifierToLifePoints} from '../Action/AddFixedModifierToLifePoints';
import {AddPerLevelModifierToLifePoints} from '../Action/AddPerLevelModifierToLifePoints';
import {AddPerLevelModifierToManaPoints} from '../Action/AddPerLevelModifierToManaPoints';
import {AddProficiency} from '../Action/AddProficiency';
import {TrainSkill} from '../Action/TrainSkill';
import {SheetBuilderError} from '../Error/SheetBuilderError';
import {FixedModifier} from '../Modifier/FixedModifier/FixedModifier';
import {PerLevelModifier} from '../Modifier/PerLevelModifier/PerLevelModifier';
import {Level} from '../Sheet/Level';
import type {Proficiency} from '../Sheet/Proficiency';
import {type TransactionInterface} from '../Sheet/TransactionInterface';
import type {SkillName} from '../Skill/SkillName';
import type {RoleAbility} from './RoleAbility';
import type {RoleInterface, SelectSkillGroup} from './RoleInterface';
import type {RoleName} from './RoleName';

export abstract class Role implements RoleInterface {
	abstract readonly initialLifePoints: number;
	abstract readonly lifePointsPerLevel: number;
	abstract readonly manaPerLevel: number;
	abstract readonly mandatorySkills: SkillName[];
	abstract readonly proficiencies: Proficiency[];
	abstract readonly name: RoleName;
	abstract readonly abilities: Record<Level, Record<string, RoleAbility>>;
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
		const abilities = this.abilities[Level.one];

		Object.values(abilities).forEach(ability => {
			ability.addToSheet(transaction, this.name);
		});
	}

	getTotalInitialSkills(): number {
		return this.mandatorySkills.length + this.selectSkillGroups.reduce((acc, curr) => curr.amount + acc, 0);
	}

	private addLifePointsModifiers(transaction: TransactionInterface) {
		transaction.run(new AddFixedModifierToLifePoints({
			payload: {
				modifier: new FixedModifier(this.name, this.initialLifePoints, new Set(['constitution'])),
			},
			transaction,
		}));

		transaction.run(new AddPerLevelModifierToLifePoints({
			payload: {
				modifier: new PerLevelModifier(this.name, this.lifePointsPerLevel, false, new Set(['constitution'])),
			},
			transaction,
		}));
	}

	private addManaPointsModifiers(transaction: TransactionInterface) {
		transaction.run(new AddPerLevelModifierToManaPoints({
			payload: {
				modifier: new PerLevelModifier(this.name, this.manaPerLevel, true),
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
					skill: skill,
					source: this.name,
				},
				transaction,
			}));
		});

		this.chosenSkills.forEach(skill => {
			transaction.run(new TrainSkill({
				payload: {
					skill: skill,
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
