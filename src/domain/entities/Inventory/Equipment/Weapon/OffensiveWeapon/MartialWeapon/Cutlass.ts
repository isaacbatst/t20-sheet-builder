import {Critical} from '../../../../../Attack/Critical';
import {DiceRoll} from '../../../../../Dice/DiceRoll';
import {EquipmentName} from '../../../EquipmentName';
import {MartialWeapon} from './MartialWeapon';
import {type MartialWeaponName} from './MartialWeaponName';

export class Cutlass extends MartialWeapon {
	static damage = new DiceRoll(2, 4);
	static critical = new Critical(18);
	static equipmentName: MartialWeaponName = EquipmentName.cutlass;

	override damage: DiceRoll = Cutlass.damage;
	override critical: Critical = Cutlass.critical;
	override name = Cutlass.equipmentName;
}
