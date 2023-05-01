import {DiceDamage} from '../../../../Dice/DiceDamage';
import {EquipmentName} from '../../EquipmentName';
import {MartialWeapon} from './MartialWeapon';
import {Critical} from './Critical';

export class LongSword extends MartialWeapon {
	readonly damage = new DiceDamage(1, 8);
	readonly critical = new Critical(19);
	readonly name = EquipmentName.longSword;
}
