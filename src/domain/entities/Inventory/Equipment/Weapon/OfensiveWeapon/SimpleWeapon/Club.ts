import {Critical} from '../../../../../Attack/Critical';
import {DiceRoll} from '../../../../../Dice/DiceRoll';
import {EquipmentName} from '../../../EquipmentName';
import {SimpleWeapon} from './SimpleWeapon';

export class Club extends SimpleWeapon {
	damage: DiceRoll = new DiceRoll(1, 6);
	critical: Critical = new Critical();
	name: EquipmentName = EquipmentName.club;
}
