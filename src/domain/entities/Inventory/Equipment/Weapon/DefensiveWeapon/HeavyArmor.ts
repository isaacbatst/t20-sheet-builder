import {Proficiency} from '../../../../Sheet/Proficiency';
import type {EquipmentName} from '../../EquipmentName';
import {Armor} from './Armor';

export class HeavyArmor extends Armor {
	constructor(name: EquipmentName) {
		super(name, Proficiency.heavyArmor);
	}
}
