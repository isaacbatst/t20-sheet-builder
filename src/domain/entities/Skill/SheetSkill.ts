import {type Skill} from './Skill';
import {type SkillTotalCalculator} from './SkillTotalCalculator';

export class SheetSkill {
	constructor(
		readonly skill: Skill,
		readonly calculator: SkillTotalCalculator,
	) {}

	getTotal(): number {
		return this.skill.getTotal(this.calculator);
	}
}
