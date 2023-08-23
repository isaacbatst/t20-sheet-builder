import type {DiceRoll, RollResult, SerializedDiceRoll} from '../Dice/DiceRoll';
import {type RandomInterface} from '../Random';
import type {Critical, SerializedCritical} from './Critical';

export type SerializedAttack = {
	damage: SerializedDiceRoll;
	critical: SerializedCritical;
};

export abstract class Attack {
	constructor(
		readonly damage: DiceRoll,
		readonly critical: Critical,
	) {}

	roll(random: RandomInterface): RollResult {
		const result = this.damage.roll(random);
		return result;
	}

	serialize(): SerializedAttack {
		return {
			damage: this.damage.serialize(),
			critical: this.critical.serialize(),
		};
	}
}
