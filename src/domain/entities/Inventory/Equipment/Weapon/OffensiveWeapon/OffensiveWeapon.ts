import type {DiceRoll} from '../../../../Dice/DiceRoll';
import type {WeaponType} from '../Weapon';
import {Weapon} from '../Weapon';
import type {Critical} from '../../../../Attack/Critical';

export abstract class OffensiveWeapon extends Weapon {
	abstract readonly damage: DiceRoll;
	abstract readonly critical: Critical;
	get type(): WeaponType {
		return 'offensive';
	}
}
