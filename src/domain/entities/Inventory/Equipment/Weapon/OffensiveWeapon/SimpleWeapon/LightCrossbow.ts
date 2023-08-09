import {Critical} from '../../../../../Attack/Critical';
import {DiceRoll} from '../../../../../Dice/DiceRoll';
import {EquipmentName} from '../../../EquipmentName';
import {SimpleWeapon} from './SimpleWeapon';
import {type SimpleWeaponName} from './SimpleWeaponName';

export class LightCrossbow extends SimpleWeapon {
	static damage = new DiceRoll(1, 8);
	static critical = new Critical(19);
	static equipmentName: SimpleWeaponName = EquipmentName.lightCrossbow;

	damage: DiceRoll = LightCrossbow.damage;
	critical: Critical = LightCrossbow.critical;
	name = LightCrossbow.equipmentName;
}
