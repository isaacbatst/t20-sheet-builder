import {DiceRoll} from '../../../../../Dice/DiceRoll';
import {EquipmentName} from '../../../EquipmentName';
import {MartialWeapon} from './MartialWeapon';
import {Critical} from '../../../../../Attack/Critical';

export class LongSword extends MartialWeapon {
	readonly damage = new DiceRoll(1, 8);
	readonly critical = new Critical(19);
	readonly name = EquipmentName.longSword;
}
