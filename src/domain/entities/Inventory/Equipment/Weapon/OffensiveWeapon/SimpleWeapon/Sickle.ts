import {Critical} from '../../../../../Attack/Critical';
import {DiceRoll} from '../../../../../Dice/DiceRoll';
import {EquipmentName} from '../../../EquipmentName';
import {WeaponPurposeMelee} from '../../WeaponPurpose';
import {SimpleWeapon} from './SimpleWeapon';
import {type SimpleWeaponName} from './SimpleWeaponName';

export class Sickle extends SimpleWeapon {
	static damage = new DiceRoll(1, 6);
	static critical = new Critical(20, 3);
	static equipmentName: SimpleWeaponName = EquipmentName.sickle;
	static purposes = [
		new WeaponPurposeMelee(),
	];

	static price = 4;

	damage: DiceRoll = Sickle.damage;
	critical: Critical = Sickle.critical;
	name = Sickle.equipmentName;
	purposes = Sickle.purposes;
	price = Sickle.price;
}
