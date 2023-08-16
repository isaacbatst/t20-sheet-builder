import {Critical} from '../../../../../Attack/Critical';
import {DiceRoll} from '../../../../../Dice/DiceRoll';
import {EquipmentName} from '../../../EquipmentName';
import {MartialWeapon} from './MartialWeapon';
import {type MartialWeaponName} from './MartialWeaponName';

export class HandAndaHalfSword extends MartialWeapon {
	static damage = new DiceRoll(2, 6);
	static critical = new Critical(19);
	static equipmentName: MartialWeaponName = EquipmentName.handAndaHalfSword;

	override damage: DiceRoll = HandAndaHalfSword.damage;
	override critical: Critical = HandAndaHalfSword.critical;
	override name = HandAndaHalfSword.equipmentName;
}
