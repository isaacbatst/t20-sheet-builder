import {Critical} from '../../../../../Attack/Critical';
import {DiceRoll} from '../../../../../Dice/DiceRoll';
import {EquipmentName} from '../../../EquipmentName';
import {WeaponPurposeMelee} from '../../WeaponPurpose';
import {SimpleWeapon} from './SimpleWeapon';
import {type SimpleWeaponName} from './SimpleWeaponName';

export class Pike extends SimpleWeapon {
	static damage = new DiceRoll(1, 8);
	static critical = new Critical();
	static equipmentName: SimpleWeaponName = EquipmentName.pike;
	static purposes = [
		new WeaponPurposeMelee(),
	];

	static price = 2;

	damage: DiceRoll = Pike.damage;
	critical: Critical = Pike.critical;
	name = Pike.equipmentName;
	purposes = Pike.purposes;
	price = Pike.price;
}
