import {DiceDamage} from '../../../../Dice/DiceDamage';
import {EquipmentName} from '../../EquipmentName';
import {Critical} from './Critical';
import {SimpleWeapon} from './SimpleWeapon';

export class Dagger extends SimpleWeapon {
	readonly damage = new DiceDamage(1, 4);
	readonly critical = new Critical(19);
	readonly name = EquipmentName.dagger;
}
