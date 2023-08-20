import {Critical} from '../../../../../Attack/Critical';
import {DiceRoll} from '../../../../../Dice/DiceRoll';
import {EquipmentName} from '../../../EquipmentName';
import {FireArmWeapon} from './FireArmWeapon';
import {type FireArmWeaponName} from './FireArmWeaponName';

export class Musket extends FireArmWeapon {
	static damage = new DiceRoll(2, 8);
	static critical = new Critical(19, 3);
	static equipmentName: FireArmWeaponName = EquipmentName.musket;

	override damage: DiceRoll = Musket.damage;
	override critical: Critical = Musket.critical;
	override name = Musket.equipmentName;
}
