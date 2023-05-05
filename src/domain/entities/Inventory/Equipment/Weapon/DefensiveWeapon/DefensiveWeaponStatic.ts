import type {EquipmentName} from '../../EquipmentName';
import type {DefensiveWeapon} from './DefensiveWeapon';

export type DefensiveWeaponStatic<Args extends any[] = any[]> = {
	defenseBonus: number;
	armorPenalty: number;
	slots: number;
	equipmentName: EquipmentName;
	new(...args: Args): DefensiveWeapon;
};
