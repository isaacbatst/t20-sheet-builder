import {Critical} from '../../../../../Attack/Critical';
import {DiceRoll} from '../../../../../Dice/DiceRoll';
import {EquipmentName} from '../../../EquipmentName';
import {WeaponPurposeRangedShooting} from '../../WeaponPurpose';
import {SimpleWeapon} from './SimpleWeapon';
import {type SimpleWeaponName} from './SimpleWeaponName';

export class Sling extends SimpleWeapon {
	static damage = new DiceRoll(1, 4);
	static critical = new Critical();
	static equipmentName: SimpleWeaponName = EquipmentName.sling;
	static purposes = [
		new WeaponPurposeRangedShooting({
			damageAttribute: 'strength',
		}),
	];

	damage: DiceRoll = Sling.damage;
	critical: Critical = Sling.critical;
	name = Sling.equipmentName;
	purposes = Sling.purposes;
}
