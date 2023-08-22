import {SheetBuilderError} from '../../errors/SheetBuilderError';
import {type RandomInterface} from '../Random';
import type {DiceSides} from './DiceSides';

export type SerializedDiceRoll = {
	diceQuantity: number;
	diceSides: DiceSides;
};

export type RollResult = {
	total: number;
	rolls: number[];
	discartedRolls: number[];
};

export class DiceRoll {
	constructor(
		readonly diceQuantity: number,
		readonly diceSides: DiceSides,
		readonly discardLowestDiceQty = 0,
	) {
		this.validateDiceQuantity(diceQuantity);
	}

	serialize(): SerializedDiceRoll {
		return {
			diceQuantity: this.diceQuantity,
			diceSides: this.diceSides,
		};
	}

	roll(random: RandomInterface): RollResult {
		const allResults: number[] = [];

		for (let i = 0; i < this.diceQuantity; i += 1) {
			allResults.push(random.get(1, this.diceSides));
		}

		allResults.sort((a, b) => a - b);

		const discartedRolls: number[] = allResults.filter((_, i) => i < this.discardLowestDiceQty);
		const rolls: number[] = allResults.filter((_, i) => i >= this.discardLowestDiceQty);
		const total = rolls.reduce((a, b) => a + b, 0);

		return {
			total,
			rolls,
			discartedRolls,
		};
	}

	private validateDiceQuantity(diceQuantity: number) {
		if (diceQuantity < 1) {
			throw new SheetBuilderError('INVALID_DICE_QUANTITY');
		}
	}
}
