import {type ContextInterface} from '../../Context';
import {Level} from '../../Sheet/Level';
import {type SerializedSheetPerLevelModifiersList} from '../../Sheet/SerializedSheet/SerializedSheetInterface';
import {type SheetInterface} from '../../Sheet/SheetInterface';
import {ModifiersList} from '../ModifiersList';
import type {ModifiersListInterface} from '../ModifiersListInterface';
import {PerLevelModifierAppliableValueCalculator} from './PerLevelModifierAppliableValueCalculator';
import type {PerLevelModifierInterface} from './PerLevelModifierInterface';
import {PerLevelModifiersListTotalCalculator} from './PerLevelModifiersListTotalCalculator';

export type PerLevelModifiersListInterface = Omit<ModifiersListInterface<PerLevelModifierInterface>, 'serialize'> & {
	getTotalPerLevel(level: Level): number;
	serialize(sheet: SheetInterface, context: ContextInterface): SerializedSheetPerLevelModifiersList;
};

export class PerLevelModifiersList extends ModifiersList<PerLevelModifierInterface>
	implements PerLevelModifiersListInterface {
	override serialize(sheet: SheetInterface, context: ContextInterface): SerializedSheetPerLevelModifiersList {
		const attributes = sheet.getSheetAttributes().getValues();
		const level = sheet.getLevel();
		const totalCalculator = new PerLevelModifiersListTotalCalculator(attributes, level);
		return {
			modifiers: this.modifiers.map(modifier => {
				const calculator = new PerLevelModifierAppliableValueCalculator(attributes, level, modifier);
				return modifier.serialize(calculator, attributes);
			}),
			total: this.getTotal(totalCalculator),
			totalPerLevel: this.getTotalPerLevel(level),
		};
	}

	getTotalPerLevel(level: Level): number {
		const isFirstLevel = level === Level.one;
		return this.modifiers
			.reduce((acc, modifier) =>
				acc + (isFirstLevel && !modifier.includeFirstLevel ? 0 : modifier.getPerLevelValue()),
			0);
	}
}
