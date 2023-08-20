import {Critical} from '../../../../../Attack/Critical';
import {DiceRoll} from '../../../../../Dice/DiceRoll';
import {EquipmentName} from '../../../EquipmentName';
import {WeaponPurposeMelee} from '../../WeaponPurpose';
import {ExoticWeapon} from './ExoticWeapon';
import {type ExoticWeaponName} from './ExoticWeaponName';

export class BastardSword extends ExoticWeapon {
	static damage = new DiceRoll(1, 10);
	static critical = new Critical(19, 2);
	static equipmentName: ExoticWeaponName = EquipmentName.bastardSword;
	static purposes = [
		new WeaponPurposeMelee(),
	];

	override damage: DiceRoll = BastardSword.damage;
	override critical: Critical = BastardSword.critical;
	override name = BastardSword.equipmentName;
	override purposes = BastardSword.purposes;
}
