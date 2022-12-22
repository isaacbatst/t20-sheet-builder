import {TrainSkill} from '../Action/TrainSkill';
import type {BuildingSheet} from '../BuildingSheet';
import type {BuildingSheetInterface} from '../BuildingSheetInterface';
import type {Proficiency} from '../Proficiency';
import type {SkillName} from '../Skill/SkillName';
import type {ChooseableSkills, RoleInterface} from './RoleInterface';
import type {RoleName} from './RoleName';

export abstract class Role implements RoleInterface {
	abstract readonly initialLifePoints: number;
	abstract readonly lifePointsPerLevel: number;
	abstract readonly manaPerLevel: number;
	abstract readonly mandatorySkills: SkillName[];
	abstract readonly chooseableSkills: ChooseableSkills[];
	abstract readonly proficiencies: Proficiency[];
	abstract readonly name: RoleName;

	constructor(readonly chosenSkills: SkillName[]) {
		const isSomeRepeated = chosenSkills.some((skill, index) => chosenSkills.indexOf(skill) !== index);

		if (isSomeRepeated) {
			throw new Error('REPEATED_ROLE_SKILLS');
		}
	}

	getTotalInitialSkills(): number {
		return this.mandatorySkills.length + this.chooseableSkills.reduce((acc, curr) => curr.amount + acc, 0);
	}

	trainSkills(sheet: BuildingSheetInterface): void {
		this.verifyChosenSkills();

		this.mandatorySkills.forEach(skill => {
			sheet.dispatch(new TrainSkill({
				name: skill,
				source: this.name,
			}));
		});

		this.chosenSkills.forEach(skill => {
			sheet.dispatch(new TrainSkill({
				name: skill,
				source: this.name,
			}));
		});
	}

	private verifyChosenSkills() {
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
