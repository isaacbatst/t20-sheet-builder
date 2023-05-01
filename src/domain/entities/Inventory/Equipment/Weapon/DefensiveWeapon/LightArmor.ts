import {Proficiency} from '../../../../Sheet/Proficiency';
import type {EquipmentName} from '../../EquipmentName';
import {Armor} from './Armor';

export abstract class LightArmor extends Armor {
	constructor() {
		super(Proficiency.lightArmor);
	}
}
