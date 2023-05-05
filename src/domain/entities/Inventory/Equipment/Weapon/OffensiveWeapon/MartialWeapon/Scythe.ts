import {Critical} from '../../../../../Attack/Critical';
import {DiceRoll} from '../../../../../Dice/DiceRoll';
import {EquipmentName} from '../../../EquipmentName';
import {MartialWeapon} from './MartialWeapon';

export class Scythe extends MartialWeapon {
	static damage = new DiceRoll(2, 4);
	static critical = new Critical(20, 4);
	static equipmentName = EquipmentName.scythe;

	damage: DiceRoll = Scythe.damage;
	critical: Critical = Scythe.critical;
	name: EquipmentName = Scythe.equipmentName;
}
