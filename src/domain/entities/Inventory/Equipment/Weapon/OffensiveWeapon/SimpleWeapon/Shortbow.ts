import {Critical} from '../../../../../Attack/Critical';
import {DiceRoll} from '../../../../../Dice/DiceRoll';
import {EquipmentName} from '../../../EquipmentName';
import {WeaponPurposeRangedShooting} from '../../WeaponPurpose';
import {SimpleWeapon} from './SimpleWeapon';
import {type SimpleWeaponName} from './SimpleWeaponName';

export class Shortbow extends SimpleWeapon {
	static damage = new DiceRoll(1, 4);
	static critical = new Critical(20, 3);
	static equipmentName: SimpleWeaponName = EquipmentName.shortbow;
	static purposes = [
		new WeaponPurposeRangedShooting(),
	];

	damage: DiceRoll = Shortbow.damage;
	critical: Critical = Shortbow.critical;
	name = Shortbow.equipmentName;
	purposes = Shortbow.purposes;
}
