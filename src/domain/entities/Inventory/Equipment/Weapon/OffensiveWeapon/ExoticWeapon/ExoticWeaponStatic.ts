
import {type Critical} from '../../../../../Attack/Critical';
import {type DiceRoll} from '../../../../../Dice/DiceRoll';
import {type Static} from '../../../../../Static';
import {type ExoticWeapon} from './ExoticWeapon';
import {type ExoticWeaponName} from './ExoticWeaponName';

export type ExoticWeaponStatic<T extends ExoticWeapon = ExoticWeapon> = Static<T, {
	damage: DiceRoll;
	critical: Critical;
	equipmentName: ExoticWeaponName;
}>;
