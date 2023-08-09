import {Critical} from '../../../../../Attack/Critical';
import {DiceRoll} from '../../../../../Dice/DiceRoll';
import {EquipmentName} from '../../../EquipmentName';
import {SimpleWeapon} from './SimpleWeapon';
import {type SimpleWeaponName} from './SimpleWeaponName';

export class StaffStick extends SimpleWeapon {
	static damage = new DiceRoll(1, 6);
	static critical = new Critical();
	static equipmentName: SimpleWeaponName = EquipmentName.staffStick;

	damage: DiceRoll = StaffStick.damage;
	critical: Critical = StaffStick.critical;
	name = StaffStick.equipmentName;
}
