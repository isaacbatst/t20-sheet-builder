import {Defense} from '../Defense/Defense';
import {type DefenseInterface} from '../Defense/DefenseInterface';
import {DefenseTotalCalculatorFactory} from '../Defense/DefenseTotalCalculatorFactory';
import {type FixedModifierInterface} from '../Modifier/FixedModifier/FixedModifier';
import {type Attributes} from './Attributes';
import {type SheetDefenseInterface} from './SheetDefenseInterface';

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
}
