import type {Static} from '../../../../Static';
import type {EquipmentName} from '../../EquipmentName';
import type {DefensiveWeapon} from './DefensiveWeapon';

export type DefensiveWeaponStatic<T extends DefensiveWeapon = DefensiveWeapon> = Static<T, {
	defenseBonus: number;
	armorPenalty: number;
	slots: number;
	equipmentName: EquipmentName;
}>;
