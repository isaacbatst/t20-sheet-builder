import {type TranslatableName} from '..';
import {type RollResult} from '../Dice';
import {DiceRoll} from '../Dice/DiceRoll';
import {Modifiers} from '../Modifier';
import {Random, type RandomInterface} from '../Random';
import {type Attribute} from '../Sheet/Attributes';
import {type Skill} from './Skill';
import {type SkillName} from './SkillName';
import {type SkillTotalCalculator} from './SkillTotalCalculator';

export type SheetSkillsObject = Record<SkillName, SheetSkill>;

export type SkillRollResult = {
	roll: RollResult;
	modifiers: Modifiers;
	modifiersTotal: number;
	isCritical: boolean;
	isFumble: boolean;
	total: number;
};

export class SheetSkill {
	static test = new DiceRoll(1, 20);

	constructor(
		readonly skill: Skill,
		readonly calculator: SkillTotalCalculator,
	) {
	}

	getFixedModifier(name: TranslatableName) {
		return this.skill.fixedModifiers.get(name);
	}

	getContextualModifier(name: TranslatableName) {
		return this.skill.contextualModifiers.get(name);
	}

	getModifiersTotal(): number {
		return this.skill.getTotal(this.calculator);
	}

	getAttributeModifier(): number {
		return this.calculator.baseCalculator.attributes[this.skill.attribute];
	}

	changeAttribute(attribute: Attribute) {
		this.skill.changeAttribute(attribute);
	}

	roll(random: RandomInterface = new Random(), threat = 20): SkillRollResult {
		const rollResult = SheetSkill.test.roll(random);

		return {
			isCritical: rollResult.total >= threat,
			isFumble: rollResult.total <= 1,
			modifiers: new Modifiers({
				contextual: this.skill.contextualModifiers,
				fixed: this.skill.fixedModifiers,
			}),
			modifiersTotal: this.getModifiersTotal(),
			roll: rollResult,
			total: rollResult.total + this.getModifiersTotal(),
		};
	}
}
