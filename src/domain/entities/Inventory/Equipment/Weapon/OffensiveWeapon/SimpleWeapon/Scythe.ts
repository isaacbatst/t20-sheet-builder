import {Critical} from '../../../../../Attack/Critical';
import {DiceRoll} from '../../../../../Dice/DiceRoll';
import {EquipmentName} from '../../../EquipmentName';
import {SimpleWeapon} from './SimpleWeapon';
import {type SimpleWeaponName} from './SimpleWeaponName';

export class Scythe extends SimpleWeapon {
	static damage = new DiceRoll(1, 6);
	static critical = new Critical(20, 3);
	static equipmentName: SimpleWeaponName = EquipmentName.scythe;

	damage: DiceRoll = Scythe.damage;
	critical: Critical = Scythe.critical;
	name = Scythe.equipmentName;
}
