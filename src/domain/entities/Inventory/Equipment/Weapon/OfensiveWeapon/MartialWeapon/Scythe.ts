import {Critical} from '../../../../../Attack/Critical';
import {DiceRoll} from '../../../../../Dice/DiceRoll';
import {EquipmentName} from '../../../EquipmentName';
import {MartialWeapon} from './MartialWeapon';

export class Scythe extends MartialWeapon {
	damage: DiceRoll = new DiceRoll(2, 4);
	critical: Critical = new Critical(20, 4);
	name: EquipmentName = EquipmentName.scythe;
}
