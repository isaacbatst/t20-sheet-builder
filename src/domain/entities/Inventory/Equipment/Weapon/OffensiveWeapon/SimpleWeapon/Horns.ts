import {Critical} from '../../../../../Attack/Critical';
import {DiceRoll} from '../../../../../Dice/DiceRoll';
import {EquipmentName} from '../../../EquipmentName';
import {WeaponPurposeMelee} from '../../WeaponPurpose';
import {SimpleWeapon} from './SimpleWeapon';
import {type SimpleWeaponName} from './SimpleWeaponName';

export class Horns extends SimpleWeapon {
	static damage: DiceRoll = new DiceRoll(1, 6);
	static critical: Critical = new Critical();
	static equipmentName: SimpleWeaponName = EquipmentName.horns;
	static purposes = [
		new WeaponPurposeMelee(),
	];

	static price = 0;

	damage: DiceRoll = Horns.damage;
	critical: Critical = Horns.critical;
	name = Horns.equipmentName;
	purposes = Horns.purposes;
	price = Horns.price;
}
