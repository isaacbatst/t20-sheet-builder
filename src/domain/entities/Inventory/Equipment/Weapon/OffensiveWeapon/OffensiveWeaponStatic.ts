import type {Critical} from '../../../../Attack/Critical';
import type {DiceRoll} from '../../../../Dice/DiceRoll';
import type {EquipmentName} from '../../EquipmentName';
import {type EquipamentStatic} from '../../EquipmentStatic';
import {type WeaponPurpose} from '../WeaponPurpose';
import type {OffensiveWeapon} from './OffensiveWeapon';

export type OffensiveWeaponStatic<
	N extends EquipmentName = EquipmentName,
	T extends OffensiveWeapon<N> = OffensiveWeapon<N>	,
> = EquipamentStatic<N, T, {
	damage: DiceRoll;
	critical: Critical;
	equipmentName: EquipmentName;
	purposes: WeaponPurpose[];
	price: number;
}>;
