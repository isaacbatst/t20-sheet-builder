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
		const base = this.baseCalculator.calculate(skill.attribute, skill.getIsTrained());
		const contextualModifiers = skill.contextualModifiers.getTotal(this.contextualCalculator);
		const fixedModifiers = skill.fixedModifiers.getTotal(this.fixedCalculator);
		return base + contextualModifiers + fixedModifiers;
	}
}
