import {Critical} from '../../../../../Attack/Critical';
import {DiceRoll} from '../../../../../Dice/DiceRoll';
import {EquipmentName} from '../../../EquipmentName';
import {WeaponPurposeMelee} from '../../WeaponPurpose';
import {ExoticWeapon} from './ExoticWeapon';
import {type ExoticWeaponName} from './ExoticWeaponName';

export class Katana extends ExoticWeapon {
	static damage = new DiceRoll(1, 10);
	static critical = new Critical(19, 2);
	static equipmentName: ExoticWeaponName = EquipmentName.katana;
	static purposes = [
		new WeaponPurposeMelee(),
	];

	static price = 100;

	override damage: DiceRoll = Katana.damage;
	override critical: Critical = Katana.critical;
	override name = Katana.equipmentName;
	override purposes = Katana.purposes;
	override price = Katana.price;
}
