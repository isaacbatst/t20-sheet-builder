import {Critical} from '../../../../../Attack/Critical';
import {DiceRoll} from '../../../../../Dice/DiceRoll';
import {EquipmentName} from '../../../EquipmentName';
import {WeaponPurposeMelee, WeaponPurposeRangedThrowing} from '../../WeaponPurpose';
import {SimpleWeapon} from './SimpleWeapon';
import {type SimpleWeaponName} from './SimpleWeaponName';

export class Assegai extends SimpleWeapon {
	static damage = new DiceRoll(1, 6);
	static critical = new Critical();
	static equipmentName: SimpleWeaponName = EquipmentName.assegai;
	static purposes = [
		new WeaponPurposeMelee({
			penalty: 5,
		}),
		new WeaponPurposeRangedThrowing(),
	];

	damage: DiceRoll = Assegai.damage;
	critical: Critical = Assegai.critical;
	name = Assegai.equipmentName;
	purposes = Assegai.purposes;
}
