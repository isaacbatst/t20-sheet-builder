import type {Static} from '../../../../Static';
import type {EquipmentName} from '../../EquipmentName';
import type {DefensiveWeapon} from './DefensiveWeapon';

export type DefensiveWeaponStatic<
	T extends DefensiveWeapon = DefensiveWeapon,
	E extends EquipmentName = EquipmentName> = Static<T, {
		defenseBonus: number;
		armorPenalty: number;
		slots: number;
		equipmentName: E;
	}>;
