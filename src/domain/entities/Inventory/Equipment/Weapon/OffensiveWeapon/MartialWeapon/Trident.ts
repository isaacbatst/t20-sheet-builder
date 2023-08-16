import {Critical} from '../../../../../Attack/Critical';
import {DiceRoll} from '../../../../../Dice/DiceRoll';
import {EquipmentName} from '../../../EquipmentName';
import {MartialWeapon} from './MartialWeapon';
import {type MartialWeaponName} from './MartialWeaponName';

export class Trident extends MartialWeapon {
	static damage = new DiceRoll(1, 8);
	static critical = new Critical();
	static equipmentName: MartialWeaponName = EquipmentName.trident;

	override damage: DiceRoll = Trident.damage;
	override critical: Critical = Trident.critical;
	override name = Trident.equipmentName;
}
