import {type Attribute} from '../Sheet/Attributes';
import {type Skill} from './Skill';
import {type SkillName} from './SkillName';
import {type SkillTotalCalculator} from './SkillTotalCalculator';

export type SheetSkillsObject = Record<SkillName, SheetSkill>;

export class SheetSkill {
	constructor(
		readonly skill: Skill,
		readonly calculator: SkillTotalCalculator,
	) {}

	getTotal(): number {
		return this.skill.getTotal(this.calculator);
	}

	makeWithOtherAttribute(attribute: Attribute): SheetSkill {
		return new SheetSkill(this.skill.makeWithOtherAttribute(attribute), this.calculator);
	}
}
