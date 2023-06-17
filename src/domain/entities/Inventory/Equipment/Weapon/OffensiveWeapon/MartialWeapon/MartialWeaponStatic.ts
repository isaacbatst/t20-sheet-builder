import {type Critical} from '../../../../../Attack/Critical';
import {type DiceRoll} from '../../../../../Dice/DiceRoll';
import {type Static} from '../../../../../Static';
import {type MartialWeapon} from './MartialWeapon';
import {type MartialWeaponName} from './MartialWeaponName';

export type MartialWeaponStatic<T extends MartialWeapon = MartialWeapon> = Static<T, {
	damage: DiceRoll;
	critical: Critical;
	equipmentName: MartialWeaponName;
}>;
