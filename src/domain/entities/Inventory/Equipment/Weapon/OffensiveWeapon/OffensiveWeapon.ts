import type {DiceRoll} from '../../../../Dice/DiceRoll';
import type {WeaponType} from '../Weapon';
import {Weapon} from '../Weapon';
import type {Critical} from '../../../../Attack/Critical';
import {type WeaponPurpose} from '../WeaponPurpose';

export abstract class OffensiveWeapon extends Weapon {
	abstract readonly damage: DiceRoll;
	abstract readonly critical: Critical;
	abstract readonly purposes: WeaponPurpose[];

	get isWieldable(): boolean {
		return true;
	}

	get type(): WeaponType {
		return 'offensive';
	}
}
