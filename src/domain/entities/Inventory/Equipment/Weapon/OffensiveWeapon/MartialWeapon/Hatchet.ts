import {Critical} from '../../../../../Attack/Critical';
import {DiceRoll} from '../../../../../Dice/DiceRoll';
import {EquipmentName} from '../../../EquipmentName';
import {WeaponPurposeMelee, WeaponPurposeRangedThrowing} from '../../WeaponPurpose';
import {MartialWeapon} from './MartialWeapon';
import {type MartialWeaponName} from './MartialWeaponName';

export class Hatchet extends MartialWeapon {
	static damage = new DiceRoll(1, 6);
	static critical = new Critical(20, 3);
	static equipmentName: MartialWeaponName = EquipmentName.hatchet;
	static purposes = [
		new WeaponPurposeMelee(),
		new WeaponPurposeRangedThrowing(),
	];

	static price = 6;

	override damage: DiceRoll = Hatchet.damage;
	override critical: Critical = Hatchet.critical;
	override name = Hatchet.equipmentName;
	override purposes = Hatchet.purposes;
	override price = Hatchet.price;
}
