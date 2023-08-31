import {type Context} from '../Context';
import {ContextualModifiersListTotalCalculator} from '../Modifier/ContextualModifier/ContextualModifiersListTotalCalculator';
import {FixedModifiersListTotalCalculator} from '../Modifier/FixedModifier/FixedModifiersListTotalCalculator';
import type {Attributes} from '../Sheet/Attributes';
import type {Level} from '../Sheet/Level';
import {SkillBaseCalculator} from './SkillBaseCalculator';
import {SkillTotalCalculator} from './SkillTotalCalculator';

export class SkillTotalCalculatorFactory {
	static make(attributes: Attributes, level: Level, context: Context) {
		const baseCalculator = new SkillBaseCalculator(level, attributes);
		const fixedCalculator = new FixedModifiersListTotalCalculator(attributes);
		const contextualCalculator = new ContextualModifiersListTotalCalculator(context, attributes);
		return new SkillTotalCalculator(baseCalculator, contextualCalculator, fixedCalculator);
	}
}
