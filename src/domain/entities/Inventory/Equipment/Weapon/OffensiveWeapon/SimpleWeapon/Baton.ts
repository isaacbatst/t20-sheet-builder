import {Critical} from '../../../../../Attack/Critical';
import {DiceRoll} from '../../../../../Dice/DiceRoll';
import {EquipmentName} from '../../../EquipmentName';
import {SimpleWeapon} from './SimpleWeapon';
import {type SimpleWeaponName} from './SimpleWeaponName';

export class Baton extends SimpleWeapon {
	static damage = new DiceRoll(1, 10);
	static critical = new Critical();
	static equipmentName: SimpleWeaponName = EquipmentName.baton;

	damage: DiceRoll = Baton.damage;
	critical: Critical = Baton.critical;
	name = Baton.equipmentName;
}
