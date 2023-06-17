import {type Critical} from '../../../../../Attack/Critical';
import {type DiceRoll} from '../../../../../Dice/DiceRoll';
import {type Static} from '../../../../../Static';
import {type SimpleWeapon} from './SimpleWeapon';
import {type SimpleWeaponName} from './SimpleWeaponName';

export type SimpleWeaponStatic<T extends SimpleWeapon = SimpleWeapon> = Static<T, {
	damage: DiceRoll;
	critical: Critical;
	equipmentName: SimpleWeaponName;
}>;
