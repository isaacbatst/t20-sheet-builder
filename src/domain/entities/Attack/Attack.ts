import type {DiceRoll, SerializedDiceRoll} from '../Dice/DiceRoll';
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

	serialize(): SerializedAttack {
		return {
			damage: this.damage.serialize(),
			critical: this.critical.serialize(),
		};
	}
}
