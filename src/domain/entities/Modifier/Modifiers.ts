import {type ContextInterface} from '../Context';
import {type Attributes} from '../Sheet/Attributes';
import {type SheetInterface} from '../Sheet/SheetInterface';
import {ContextualModifiersList, type ContextualModifiersListTotalCalculator} from './ContextualModifier';
import {FixedModifiersList, type FixedModifiersListTotalCalculator} from './FixedModifier';
import {PerLevelModifiersList, type PerLevelModifiersListTotalCalculator} from './PerLevelModifier';

export type ModifiersParams = {
	fixed: FixedModifiersList;
	contextual: ContextualModifiersList;
	perLevel: PerLevelModifiersList;
};

export type ModifiersTotalCalculators = {
	fixedCalculator: FixedModifiersListTotalCalculator;
	contextCalculator: ContextualModifiersListTotalCalculator;
	perLevelCalculator: PerLevelModifiersListTotalCalculator;
};

export type ModifiersMaxTotalCalculators = Omit<ModifiersTotalCalculators, 'contextCalculator'>;

export class Modifiers {
	readonly fixed: FixedModifiersList;
	readonly contextual: ContextualModifiersList;
	readonly perLevel: PerLevelModifiersList;

	constructor(params: Partial<ModifiersParams> = {}) {
		this.fixed = params.fixed ?? new FixedModifiersList();
		this.contextual = params.contextual ?? new ContextualModifiersList();
		this.perLevel = params.perLevel ?? new PerLevelModifiersList();
	}

	getTotal({
		contextCalculator,
		fixedCalculator,
		perLevelCalculator,
	}: ModifiersTotalCalculators) {
		return this.fixed.getTotal(fixedCalculator)
			+ this.contextual.getTotal(contextCalculator)
			+ this.perLevel.getTotal(perLevelCalculator);
	}

	getMaxTotal(attributes: Attributes, {
		fixedCalculator,
		perLevelCalculator,
	}: ModifiersMaxTotalCalculators) {
		return this.fixed.getTotal(fixedCalculator)
			+ this.contextual.getMaxTotal(attributes)
			+ this.perLevel.getTotal(perLevelCalculator);
	}

	serialize(sheet: SheetInterface, context: ContextInterface) {
		return {
			fixed: this.fixed.serialize(sheet, context),
			contextual: this.contextual.serialize(sheet, context),
			perLevel: this.perLevel.serialize(sheet, context),
		};
	}
}
