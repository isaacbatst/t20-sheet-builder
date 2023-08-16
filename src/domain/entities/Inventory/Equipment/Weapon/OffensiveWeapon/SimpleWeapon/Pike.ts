import {Critical} from '../../../../../Attack/Critical';
import {DiceRoll} from '../../../../../Dice/DiceRoll';
import {EquipmentName} from '../../../EquipmentName';
import {SimpleWeapon} from './SimpleWeapon';
import {type SimpleWeaponName} from './SimpleWeaponName';

export class Pike extends SimpleWeapon {
	static damage = new DiceRoll(1, 8);
	static critical = new Critical();
	static equipmentName: SimpleWeaponName = EquipmentName.pike;

	damage: DiceRoll = Pike.damage;
	critical: Critical = Pike.critical;
	name = Pike.equipmentName;
}
