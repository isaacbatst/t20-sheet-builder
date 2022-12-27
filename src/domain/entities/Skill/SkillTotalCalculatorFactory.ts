import type {Attributes} from '../Attributes';
import type {ContextInterface} from '../ContextInterface';
import type {Level} from '../Levels';
import {ContextualModifiersListTotalCalculator} from '../Modifier/ContextualModifier/ContextualModifiersListTotalCalculator';
import {FixedModifiersListTotalCalculator} from '../Modifier/FixedModifier/FixedModifiersListTotalCalculator';
import {SkillBaseCalculator} from './SkillBaseCalculator';
import {SkillTotalCalculator} from './SkillTotalCalculator';

export class SkillTotalCalculatorFactory {
	static make(attributes: Attributes, level: Level, context: ContextInterface) {
		const baseCalculator = new SkillBaseCalculator(level, attributes);
		const fixedCalculator = new FixedModifiersListTotalCalculator(attributes);
		const contextualCalculator = new ContextualModifiersListTotalCalculator(context, attributes);
		return new SkillTotalCalculator(baseCalculator, contextualCalculator, fixedCalculator);
	}
}
