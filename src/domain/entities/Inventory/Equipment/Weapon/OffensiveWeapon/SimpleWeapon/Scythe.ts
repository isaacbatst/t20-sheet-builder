import {Critical} from '../../../../../Attack/Critical';
import {DiceRoll} from '../../../../../Dice/DiceRoll';
import {EquipmentName} from '../../../EquipmentName';
import {WeaponPurposeMelee} from '../../WeaponPurpose';
import {SimpleWeapon} from './SimpleWeapon';
import {type SimpleWeaponName} from './SimpleWeaponName';

export class Scythe extends SimpleWeapon {
	static damage = new DiceRoll(1, 6);
	static critical = new Critical(20, 3);
	static equipmentName: SimpleWeaponName = EquipmentName.scythe;
	static purposes = [
		new WeaponPurposeMelee(),
	];

	damage: DiceRoll = Scythe.damage;
	critical: Critical = Scythe.critical;
	name = Scythe.equipmentName;
	purposes = Scythe.purposes;
}
