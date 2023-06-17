import {Critical} from '../../../../../Attack/Critical';
import {DiceRoll} from '../../../../../Dice/DiceRoll';
import {EquipmentName} from '../../../EquipmentName';
import {MartialWeapon} from './MartialWeapon';
import {type MartialWeaponName} from './MartialWeaponName';

export class LongSword extends MartialWeapon {
	static damage = new DiceRoll(1, 8);
	static critical = new Critical(19);
	static equipmentName: MartialWeaponName = EquipmentName.longSword;

	override damage: DiceRoll = LongSword.damage;
	override critical: Critical = LongSword.critical;
	override name = LongSword.equipmentName;
}
