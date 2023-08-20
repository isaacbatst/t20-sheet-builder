import {type ContextInterface, OutOfGameContext} from '../Context';
import {Defense} from '../Defense/Defense';
import {type DefenseInterface} from '../Defense/DefenseInterface';
import {DefenseTotalCalculatorFactory} from '../Defense/DefenseTotalCalculatorFactory';
import {type FixedModifierInterface} from '../Modifier/FixedModifier/FixedModifier';
import {type Attributes} from './Attributes';
import {type SerializedSheetDefense} from './SerializedSheet/SerializedSheetInterface';
import {type SheetDefenseInterface} from './SheetDefenseInterface';
import {type SheetInterface} from './SheetInterface';

export class SheetDefense implements SheetDefenseInterface {
	constructor(
		private readonly defense: DefenseInterface = new Defense(),
	) {}

	addFixedModifier(modifier: FixedModifierInterface): void {
		this.defense.addFixedModifier(modifier);
	}

	getTotal(attributes: Attributes, armorBonus: number, shieldBonus: number) {
		const calculator = DefenseTotalCalculatorFactory.make(attributes, armorBonus, shieldBonus);
		return this.defense.getTotal(calculator);
	}

	getDefense(): DefenseInterface {
		return this.defense;
	}

	serialize(sheet: SheetInterface, context: ContextInterface = new OutOfGameContext()): SerializedSheetDefense {
		const attributes = sheet.getSheetAttributes().getValues();
		const inventory = sheet.getSheetInventory();
		const armorBonus = inventory.getArmorBonus();
		const shieldBonus = inventory.getShieldBonus();
		const totalCalculator = DefenseTotalCalculatorFactory.make(attributes, armorBonus, shieldBonus);

		return {
			attribute: this.defense.attribute,
			fixedModifiers: this.defense.fixedModifiers.serialize(sheet, context),
			total: this.defense.getTotal(totalCalculator),
		};
	}
}
