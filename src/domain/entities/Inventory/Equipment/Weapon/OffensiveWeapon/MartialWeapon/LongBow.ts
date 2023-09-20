import {Critical} from '../../../../../Attack/Critical';
import {DiceRoll} from '../../../../../Dice/DiceRoll';
import {EquipmentName} from '../../../EquipmentName';
import {WeaponPurposeRangedShooting} from '../../WeaponPurpose';
import {MartialWeapon} from './MartialWeapon';
import {type MartialWeaponName} from './MartialWeaponName';

export class LongBow extends MartialWeapon {
	static damage = new DiceRoll(1, 8);
	static critical = new Critical(20, 3);
	static equipmentName: MartialWeaponName = EquipmentName.longBow;
	static purposes = [
		new WeaponPurposeRangedShooting(),
	];

	static price = 100;

	override damage: DiceRoll = LongBow.damage;
	override critical: Critical = LongBow.critical;
	override name = LongBow.equipmentName;
	override purposes = LongBow.purposes;
	override price = LongBow.price;
}
