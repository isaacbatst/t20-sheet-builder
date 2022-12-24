import {AddProficiency} from '../Action/AddProficiency';
import {ChooseRole} from '../Action/ChooseRole';
import {TrainSkill} from '../Action/TrainSkill';
import type {BuildingSheetInterface} from '../Sheet/BuildingSheetInterface';
import {Level} from '../Levels';
import type {Proficiency} from '../Proficiency';
import type {Dispatch} from '../Sheet/SheetInterface';
import type {SkillName} from '../Skill/SkillName';
import type {RoleAbility} from './RoleAbility';
import type {ChooseableSkills, RoleInterface} from './RoleInterface';
import type {RoleName} from './RoleName';

export abstract class Role implements RoleInterface {
	abstract readonly initialLifePoints: number;
	abstract readonly lifePointsPerLevel: number;
	abstract readonly manaPerLevel: number;
	abstract readonly mandatorySkills: SkillName[];
	abstract readonly proficiencies: Proficiency[];
	abstract readonly name: RoleName;
	abstract readonly abilities: Record<Level, Record<string, RoleAbility>>;

	/**
 * Returns an instance of this role.
 * @param chosenSkills - Chosen role skills to be trained
  **/

	constructor(
		readonly chosenSkills: SkillName[],
		readonly chooseableSkills: ChooseableSkills[],
	) {
		this.validateChosenSkills();
	}

	addToSheet(sheet: BuildingSheetInterface, dispatch: Dispatch): void {
		dispatch(new ChooseRole({role: this}));
		this.trainSkills(dispatch);
		this.addProficiencies(dispatch);
		this.addLevelOneAbilities(sheet, dispatch);
	}

	addLevelOneAbilities(sheet: BuildingSheetInterface, dispatch: Dispatch) {
		const abilities = this.abilities[Level.levelOne];

		Object.values(abilities).forEach(ability => {
			ability.addToSheet(sheet, dispatch, this.name);
		});
	}

	getTotalInitialSkills(): number {
		return this.mandatorySkills.length + this.chooseableSkills.reduce((acc, curr) => curr.amount + acc, 0);
	}

	private addProficiencies(dispatch: Dispatch): void {
		this.proficiencies.forEach(proficiency => {
			dispatch(new AddProficiency({
				proficiency,
				source: this.name,
			}));
		});
	}

	private trainSkills(dispatch: Dispatch): void {
		this.mandatorySkills.forEach(skill => {
			dispatch(new TrainSkill({
				name: skill,
				source: this.name,
			}));
		});

		this.chosenSkills.forEach(skill => {
			dispatch(new TrainSkill({
				name: skill,
				source: this.name,
			}));
		});
	}

	private validateChosenSkills() {
		const isSomeRepeated = this.chosenSkills.some((skill, index) => this.chosenSkills.indexOf(skill) !== index);

		if (isSomeRepeated) {
			throw new Error('REPEATED_ROLE_SKILLS');
		}

		const chosenSkills = this.chosenSkills.slice();
		const groupCounters: number[] = [];

		this.chooseableSkills.forEach(group => {
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
