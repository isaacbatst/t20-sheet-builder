import {Critical} from '../../../../../Attack/Critical';
import {DiceRoll} from '../../../../../Dice/DiceRoll';
import {EquipmentName} from '../../../EquipmentName';
import {WeaponPurposeRangedShooting} from '../../WeaponPurpose';
import {MartialWeapon} from './MartialWeapon';
import {type MartialWeaponName} from './MartialWeaponName';

export class HeavyCrossbow extends MartialWeapon {
	static damage = new DiceRoll(1, 12);
	static critical = new Critical(19);
	static equipmentName: MartialWeaponName = EquipmentName.heavyCrossbow;
	static purposes = [
		new WeaponPurposeRangedShooting(),
	];

	static price = 50;

	override damage: DiceRoll = HeavyCrossbow.damage;
	override critical: Critical = HeavyCrossbow.critical;
	override name = HeavyCrossbow.equipmentName;
	override purposes = HeavyCrossbow.purposes;
	override price = HeavyCrossbow.price;
}
