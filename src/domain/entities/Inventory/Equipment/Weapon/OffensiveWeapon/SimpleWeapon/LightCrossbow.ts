import {Critical} from '../../../../../Attack/Critical';
import {DiceRoll} from '../../../../../Dice/DiceRoll';
import {EquipmentName} from '../../../EquipmentName';
import {WeaponPurposeRangedShooting} from '../../WeaponPurpose';
import {SimpleWeapon} from './SimpleWeapon';
import {type SimpleWeaponName} from './SimpleWeaponName';

export class LightCrossbow extends SimpleWeapon {
	static damage = new DiceRoll(1, 8);
	static critical = new Critical(19);
	static equipmentName: SimpleWeaponName = EquipmentName.lightCrossbow;
	static purposes = [
		new WeaponPurposeRangedShooting(),
	];

	static price = 35;

	damage: DiceRoll = LightCrossbow.damage;
	critical: Critical = LightCrossbow.critical;
	name = LightCrossbow.equipmentName;
	purposes = LightCrossbow.purposes;
	price = LightCrossbow.price;
}
