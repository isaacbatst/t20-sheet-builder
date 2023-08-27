import {type RollResult} from '../Dice';
import {DiceRoll} from '../Dice/DiceRoll';
import {Random, type RandomInterface} from '../Random';
import {type Attribute} from '../Sheet/Attributes';
import {type Skill} from './Skill';
import {type SkillName} from './SkillName';
import {type SkillTotalCalculator} from './SkillTotalCalculator';

export type SheetSkillsObject = Record<SkillName, SheetSkill>;

export type SkillRollResult = {
	total: number;
};

export class SheetSkill {
	static test = new DiceRoll(1, 20);

	constructor(
		readonly skill: Skill,
		readonly calculator: SkillTotalCalculator,
	) {}

	getModifiersTotal(): number {
		return this.skill.getTotal(this.calculator);
	}

	getAttributeModifier(): number {
		return this.calculator.baseCalculator.attributes[this.skill.attribute];
	}

	makeWithOtherAttribute(attribute: Attribute): SheetSkill {
		return new SheetSkill(this.skill.makeWithOtherAttribute(attribute), this.calculator);
	}

	roll(random: RandomInterface = new Random()): SkillRollResult {
		const testResult = SheetSkill.test.roll(random);
		return {
			total: testResult.total + this.getModifiersTotal(),
		};
	}
}
