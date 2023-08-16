import {Critical} from '../../../../../Attack/Critical';
import {DiceRoll} from '../../../../../Dice/DiceRoll';
import {EquipmentName} from '../../../EquipmentName';
import {SimpleWeapon} from './SimpleWeapon';
import {type SimpleWeaponName} from './SimpleWeaponName';

export class Shortbow extends SimpleWeapon {
	static damage = new DiceRoll(1, 4);
	static critical = new Critical(20, 3);
	static equipmentName: SimpleWeaponName = EquipmentName.shortbow;

	damage: DiceRoll = Shortbow.damage;
	critical: Critical = Shortbow.critical;
	name = Shortbow.equipmentName;
}
