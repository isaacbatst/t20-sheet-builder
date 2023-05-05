import {Critical} from '../../../../../Attack/Critical';
import {DiceRoll} from '../../../../../Dice/DiceRoll';
import {EquipmentName} from '../../../EquipmentName';
import type {OffensiveWeaponStatic} from '../OffensiveWeaponStatic';
import {SimpleWeapon} from './SimpleWeapon';

export class Club extends SimpleWeapon {
	static damage: DiceRoll = new DiceRoll(1, 6);
	static critical: Critical = new Critical();
	static equipmentName: EquipmentName = EquipmentName.club;

	damage: DiceRoll = Club.damage;
	critical: Critical = Club.critical;
	name: EquipmentName = Club.equipmentName;
}
