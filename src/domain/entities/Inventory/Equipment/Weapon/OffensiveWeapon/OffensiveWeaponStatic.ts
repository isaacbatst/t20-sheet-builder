import type {Critical} from '../../../../Attack/Critical';
import type {DiceRoll} from '../../../../Dice/DiceRoll';
import type {Static} from '../../../../Static';
import type {EquipmentName} from '../../EquipmentName';
import type {OffensiveWeapon} from './OffensiveWeapon';

export type OffensiveWeaponStatic<T extends OffensiveWeapon = OffensiveWeapon> = Static<T, {
	damage: DiceRoll;
	critical: Critical;
	equipmentName: EquipmentName;
}>;
