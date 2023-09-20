import {Critical} from '../../../../../Attack/Critical';
import {DiceRoll} from '../../../../../Dice/DiceRoll';
import {EquipmentName} from '../../../EquipmentName';
import {FireArmWeapon} from './FireArmWeapon';
import {type FireArmWeaponName} from './FireArmWeaponName';

export class Pistol extends FireArmWeapon {
	static damage = new DiceRoll(2, 6);
	static critical = new Critical(19, 3);
	static equipmentName: FireArmWeaponName = EquipmentName.pistol;
	static price = 250;

	override damage: DiceRoll = Pistol.damage;
	override critical: Critical = Pistol.critical;
	override name = Pistol.equipmentName;
	override price = Pistol.price;
}
