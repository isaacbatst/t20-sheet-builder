import {Critical} from '../../../../../Attack/Critical';
import {DiceRoll} from '../../../../../Dice/DiceRoll';
import {EquipmentName} from '../../../EquipmentName';
import {WeaponPurposeMelee} from '../../WeaponPurpose';
import {MartialWeapon} from './MartialWeapon';
import {type MartialWeaponName} from './MartialWeaponName';

export class WarHammer extends MartialWeapon {
	static damage = new DiceRoll(1, 8);
	static critical = new Critical(20, 3);
	static equipmentName: MartialWeaponName = EquipmentName.warHammer;
	static purposes = [
		new WeaponPurposeMelee(),
	];

	static price = 12;

	override damage: DiceRoll = WarHammer.damage;
	override critical: Critical = WarHammer.critical;
	override name = WarHammer.equipmentName;
	override purposes = WarHammer.purposes;
	override price = WarHammer.price;
}
