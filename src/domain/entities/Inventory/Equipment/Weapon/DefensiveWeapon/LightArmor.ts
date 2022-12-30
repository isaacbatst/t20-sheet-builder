import {Proficiency} from '../../../../Sheet/Proficiency';
import type {EquipmentName} from '../../EquipmentName';
import {Armor} from './Armor';

export class LightArmor extends Armor {
	constructor(name: EquipmentName) {
		super(name, Proficiency.lightArmor);
	}
}
