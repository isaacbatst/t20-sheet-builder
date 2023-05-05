import {DiceRoll} from '../../../../../Dice/DiceRoll';
import {EquipmentName} from '../../../EquipmentName';
import {Critical} from '../../../../../Attack/Critical';
import {SimpleWeapon} from './SimpleWeapon';

export class Dagger extends SimpleWeapon {
	readonly damage = new DiceRoll(1, 4);
	readonly critical = new Critical(19);
	readonly name = EquipmentName.dagger;
}
