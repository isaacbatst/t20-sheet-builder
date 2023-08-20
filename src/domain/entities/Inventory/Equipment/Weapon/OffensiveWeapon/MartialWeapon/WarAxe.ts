import {Critical} from '../../../../../Attack/Critical';
import {DiceRoll} from '../../../../../Dice/DiceRoll';
import {EquipmentName} from '../../../EquipmentName';
import {MartialWeapon} from './MartialWeapon';
import {type MartialWeaponName} from './MartialWeaponName';

export class WarAxe extends MartialWeapon {
	static damage = new DiceRoll(1, 12);
	static critical = new Critical(20, 3);
	static equipmentName: MartialWeaponName = EquipmentName.warAxe;

	override damage: DiceRoll = WarAxe.damage;
	override critical: Critical = WarAxe.critical;
	override name = WarAxe.equipmentName;
}
