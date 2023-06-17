import {Critical} from '../../../../../Attack/Critical';
import {DiceRoll} from '../../../../../Dice/DiceRoll';
import {EquipmentName} from '../../../EquipmentName';
import {SimpleWeapon} from './SimpleWeapon';
import {type SimpleWeaponName} from './SimpleWeaponName';

export class Club extends SimpleWeapon {
	static damage: DiceRoll = new DiceRoll(1, 6);
	static critical: Critical = new Critical();
	static equipmentName: SimpleWeaponName = EquipmentName.club;

	damage: DiceRoll = Club.damage;
	critical: Critical = Club.critical;
	name = Club.equipmentName;
}
