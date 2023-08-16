import {Critical} from '../../../../../Attack/Critical';
import {DiceRoll} from '../../../../../Dice/DiceRoll';
import {EquipmentName} from '../../../EquipmentName';
import {MartialWeapon} from './MartialWeapon';
import {type MartialWeaponName} from './MartialWeaponName';

export class Flail extends MartialWeapon {
	static damage = new DiceRoll(1, 8);
	static critical = new Critical();
	static equipmentName: MartialWeaponName = EquipmentName.flail;

	override damage: DiceRoll = Flail.damage;
	override critical: Critical = Flail.critical;
	override name = Flail.equipmentName;
}
