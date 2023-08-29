import {FixedModifier} from '../Modifier';
import type {ContextualModifiersListTotalCalculatorInterface} from '../Modifier/ContextualModifier/ContextualModifiersListTotalCalculator';
import type {FixedModifiersListTotalCalculatorInterface} from '../Modifier/FixedModifier/FixedModifiersListTotalCalculator';
import type {Skill} from './Skill';
import type {SkillBaseCalculatorInterface} from './SkillBaseCalculator';

export class SkillTotalCalculator {
	constructor(
		readonly baseCalculator: SkillBaseCalculatorInterface,
		readonly contextualCalculator: ContextualModifiersListTotalCalculatorInterface,
		readonly fixedCalculator: FixedModifiersListTotalCalculatorInterface,
	) {}

	calculate(skill: Skill) {
		const fixedModifiers = skill.fixedModifiers.clone();
		fixedModifiers.add(new FixedModifier('default', skill.getAttributeModifier(this.baseCalculator.attributes)));
		fixedModifiers.add(new FixedModifier('default', skill.getLevelPoints(this.baseCalculator.level)));
		fixedModifiers.add(new FixedModifier('default', skill.getTrainingPoints(this.baseCalculator.level)));

		const fixedModifiersTotal = fixedModifiers.getTotal(this.fixedCalculator);
		const contextualModifiersTotal = skill.contextualModifiers.getTotal(this.contextualCalculator);
		return contextualModifiersTotal + fixedModifiersTotal;
	}
}
