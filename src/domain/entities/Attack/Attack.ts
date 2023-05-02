import type {DiceRoll} from '../Dice/DiceRoll';
import type {Critical} from './Critical';

export abstract class Attack {
	constructor(
		readonly damage: DiceRoll,
		readonly critical: Critical,
	) {}
}
