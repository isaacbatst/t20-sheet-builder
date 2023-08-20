import {Critical} from '../../../../../Attack/Critical';
import {DiceRoll} from '../../../../../Dice/DiceRoll';
import {EquipmentName} from '../../../EquipmentName';
import {WeaponPurposeMelee} from '../../WeaponPurpose';
import {SimpleWeapon} from './SimpleWeapon';
import {type SimpleWeaponName} from './SimpleWeaponName';

export class Mace extends SimpleWeapon {
	static damage = new DiceRoll(1, 8);
	static critical = new Critical();
	static equipmentName: SimpleWeaponName = EquipmentName.mace;
	static purposes = [
		new WeaponPurposeMelee(),
	];

	damage: DiceRoll = Mace.damage;
	critical: Critical = Mace.critical;
	name = Mace.equipmentName;
	purposes = Mace.purposes;
}
