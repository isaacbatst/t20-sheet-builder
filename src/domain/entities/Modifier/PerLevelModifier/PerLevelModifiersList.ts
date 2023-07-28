import {type ContextInterface} from '../../Context';
import {type Level} from '../../Sheet';
import {type SheetInterface} from '../../Sheet/SheetInterface';
import {type SerializedModifier} from '../ModifierInterface';
import {ModifiersList} from '../ModifiersList';
import type {ModifiersListInterface} from '../ModifiersListInterface';
import {PerLevelModifierAppliableValueCalculator} from './PerLevelModifierAppliableValueCalculator';
import type {PerLevelModifierInterface} from './PerLevelModifierInterface';

export type PerLevelModifiersListInterface = ModifiersListInterface<PerLevelModifierInterface> & {
	getTotalPerLevel(level: Level): number;
};

export class PerLevelModifiersList extends ModifiersList<PerLevelModifierInterface>
	implements PerLevelModifiersListInterface {
	override serialize(sheet: SheetInterface, context: ContextInterface): SerializedModifier[] {
		return this.modifiers.map(modifier => {
			const appliableValueCalculator = new PerLevelModifierAppliableValueCalculator(
				sheet.getSheetAttributes().getValues(),
				sheet.getLevel(),
				modifier,
			);

			return modifier.serialize(appliableValueCalculator, sheet.getSheetAttributes().getValues());
		});
	}

	getTotalPerLevel(level: Level): number {
		const isFirstLevel = level === 1;
		return this.modifiers
			.reduce((acc, modifier) =>
				acc + (isFirstLevel && !modifier.includeFirstLevel ? 0 : modifier.getPerLevelValue()),
			0);
	}
}
