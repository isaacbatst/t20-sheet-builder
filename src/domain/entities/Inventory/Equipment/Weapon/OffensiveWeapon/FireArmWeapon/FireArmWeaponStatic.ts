
import {type Critical} from '../../../../../Attack/Critical';
import {type DiceRoll} from '../../../../../Dice/DiceRoll';
import {type Static} from '../../../../../Static';
import {type FireArmWeapon} from './FireArmWeapon';
import {type FireArmWeaponName} from './FireArmWeaponName';

export type FireArmWeaponStatic<T extends FireArmWeapon = FireArmWeapon> = Static<T, {
	damage: DiceRoll;
	critical: Critical;
	equipmentName: FireArmWeaponName;
}>;
