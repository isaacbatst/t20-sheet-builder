import {AddFixedModifierToLifePoints} from '../Action/AddFixedModifierToLifePoints';
import {AddPerLevelModifierToLifePoints} from '../Action/AddPerLevelModifierToLifePoints';
import {AddPerLevelModifierToManaPoints} from '../Action/AddPerLevelModifierToManaPoints';
import {AddProficiency} from '../Action/AddProficiency';
import {TrainSkill} from '../Action/TrainSkill';
import {FixedModifier} from '../Modifier/FixedModifier/FixedModifier';
import {PerLevelModifier} from '../Modifier/PerLevelModifier/PerLevelModifier';
import {Level} from '../Sheet/Levels';
import type {Proficiency} from '../Sheet/Proficiency';
import type {SheetBaseInterface} from '../Sheet/SheetBaseInterface';
import type {Dispatch} from '../Sheet/Transaction';
import type {SkillName} from '../Skill/SkillName';
import type {RoleAbility} from './RoleAbility';
import type {SelectSkillGroup, RoleInterface} from './RoleInterface';
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

	addToSheet(sheet: SheetBaseInterface, dispatch: Dispatch): void {
		this.addLifePointsModifiers(dispatch, sheet);
		this.addManaPointsModifiers(dispatch, sheet);
		this.trainSkills(dispatch, sheet);
		this.addProficiencies(dispatch, sheet);
		this.addLevelOneAbilities(dispatch, sheet);
	}

	addLevelOneAbilities(dispatch: Dispatch, sheet: SheetBaseInterface) {
		const abilities = this.abilities[Level.one];

		Object.values(abilities).forEach(ability => {
			ability.addToSheet(sheet, dispatch, this.name);
		});
	}

	getTotalInitialSkills(): number {
		return this.mandatorySkills.length + this.selectSkillGroups.reduce((acc, curr) => curr.amount + acc, 0);
	}

	private addLifePointsModifiers(dispatch: Dispatch, sheet: SheetBaseInterface) {
		dispatch(new AddFixedModifierToLifePoints({
			modifier: new FixedModifier(this.name, this.initialLifePoints, new Set(['constitution'])),
		}), sheet);

		dispatch(new AddPerLevelModifierToLifePoints({
			modifier: new PerLevelModifier(this.name, this.lifePointsPerLevel, false, new Set(['constitution'])),
		}), sheet);
	}

	private addManaPointsModifiers(dispatch: Dispatch, sheet: SheetBaseInterface) {
		dispatch(new AddPerLevelModifierToManaPoints({
			modifier: new PerLevelModifier(this.name, this.manaPerLevel, true),
		}), sheet);
	}

	private addProficiencies(dispatch: Dispatch, sheet: SheetBaseInterface): void {
		this.proficiencies.forEach(proficiency => {
			dispatch(new AddProficiency({
				proficiency,
				source: this.name,
			}), sheet);
		});
	}

	private trainSkills(dispatch: Dispatch, sheet: SheetBaseInterface): void {
		this.mandatorySkills.forEach(skill => {
			dispatch(new TrainSkill({
				name: skill,
				source: this.name,
			}), sheet);
		});

		this.chosenSkills.forEach(skill => {
			dispatch(new TrainSkill({
				name: skill,
				source: this.name,
			}), sheet);
		});
	}

	private validateChosenSkills() {
		const isSomeRepeated = this.chosenSkills.some((skill, index) => this.chosenSkills.indexOf(skill) !== index);

		if (isSomeRepeated) {
			throw new Error('REPEATED_ROLE_SKILLS');
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
			throw new Error('INVALID_CHOSEN_SKILLS');
		}

		if (groupCounters.some(counter => counter !== 0)) {
			throw new Error('MISSING_ROLE_SKILLS');
		}
	}
}
