import {EquipmentName} from '../../EquipmentName';
import {SimpleWeapon} from './SimpleWeapon';

export class Dagger extends SimpleWeapon {
	constructor() {
		super(EquipmentName.dagger);
	}
}
