import {SheetBuilderError} from '../../errors/SheetBuilderError';
import type {DiceSides} from './DiceSides';

export type SerializedDiceRoll = {
	diceQuantity: number;
	diceSides: DiceSides;
};

export class DiceRoll {
	constructor(
		readonly diceQuantity: number,
		readonly diceSides: DiceSides,
	) {
		this.validateDiceQuantity(diceQuantity);
	}

	serialize(): SerializedDiceRoll {
		return {
			diceQuantity: this.diceQuantity,
			diceSides: this.diceSides,
		};
	}

	private validateDiceQuantity(diceQuantity: number) {
		if (diceQuantity < 1) {
			throw new SheetBuilderError('INVALID_DICE_QUANTITY');
		}
	}
}
