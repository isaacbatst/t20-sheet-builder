import type {EquipmentName} from '../../EquipmentName';
import {type EquipamentStatic} from '../../EquipmentStatic';
import type {DefensiveWeapon} from './DefensiveWeapon';

export type DefensiveWeaponStatic<
	N extends EquipmentName = EquipmentName,
	T extends DefensiveWeapon<N> = DefensiveWeapon<N>,
> = EquipamentStatic<N, T, {
	defenseBonus: number;
	armorPenalty: number;
	slots: number;
	equipmentName: N;
}>;
