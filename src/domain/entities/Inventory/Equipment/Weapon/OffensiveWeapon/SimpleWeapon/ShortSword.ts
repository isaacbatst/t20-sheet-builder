import {Critical} from '../../../../../Attack/Critical';
import {DiceRoll} from '../../../../../Dice/DiceRoll';
import {EquipmentName} from '../../../EquipmentName';
import {WeaponPurposeMelee} from '../../WeaponPurpose';
import {SimpleWeapon} from './SimpleWeapon';
import {type SimpleWeaponName} from './SimpleWeaponName';

export class ShortSword extends SimpleWeapon {
	static damage = new DiceRoll(1, 6);
	static critical = new Critical(19);
	static equipmentName: SimpleWeaponName = EquipmentName.shortSword;
	static purposes = [
		new WeaponPurposeMelee(),
	];

	damage: DiceRoll = ShortSword.damage;
	critical: Critical = ShortSword.critical;
	name = ShortSword.equipmentName;
	purposes = ShortSword.purposes;
}
