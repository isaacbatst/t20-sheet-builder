import {Critical} from '../../../../../Attack/Critical';
import {DiceRoll} from '../../../../../Dice/DiceRoll';
import {EquipmentName} from '../../../EquipmentName';
import {MartialWeapon} from './MartialWeapon';
import {type MartialWeaponName} from './MartialWeaponName';

export class Pickaxe extends MartialWeapon {
	static damage = new DiceRoll(1, 6);
	static critical = new Critical(20, 4);
	static equipmentName: MartialWeaponName = EquipmentName.pickaxe;

	override damage: DiceRoll = Pickaxe.damage;
	override critical: Critical = Pickaxe.critical;
	override name = Pickaxe.equipmentName;
}
