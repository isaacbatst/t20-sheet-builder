import type {Critical} from '../../../../Attack/Critical';
import type {DiceRoll} from '../../../../Dice/DiceRoll';
import type {EquipmentName} from '../../EquipmentName';
import type {OffensiveWeapon} from './OffensiveWeapon';

export type OffensiveWeaponStatic<Args extends any[] = any[]> = {
	damage: DiceRoll;
	critical: Critical;
	equipmentName: EquipmentName;
	new(...args: Args): OffensiveWeapon;
};
