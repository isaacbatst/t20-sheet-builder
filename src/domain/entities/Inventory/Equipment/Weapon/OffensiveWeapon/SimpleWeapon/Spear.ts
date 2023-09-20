import {Critical} from '../../../../../Attack/Critical';
import {DiceRoll} from '../../../../../Dice/DiceRoll';
import {EquipmentName} from '../../../EquipmentName';
import {WeaponPurposeMelee, WeaponPurposeRangedThrowing} from '../../WeaponPurpose';
import {SimpleWeapon} from './SimpleWeapon';
import {type SimpleWeaponName} from './SimpleWeaponName';

export class Spear extends SimpleWeapon {
	static damage = new DiceRoll(1, 6);
	static critical = new Critical();
	static equipmentName: SimpleWeaponName = EquipmentName.spear;
	static purposes = [
		new WeaponPurposeMelee(),
		new WeaponPurposeRangedThrowing(),
	];

	static price = 2;

	damage: DiceRoll = Spear.damage;
	critical: Critical = Spear.critical;
	name = Spear.equipmentName;
	purposes = Spear.purposes;
	price = Spear.price;
}
