import {Proficiency} from '../../../../../../Sheet/Proficiency';
import {EquipmentName} from '../../../../EquipmentName';
import {Armor} from '../Armor';

export abstract class LightArmor extends Armor {
	static getAll(): EquipmentName[] {
		return [
			EquipmentName.studdedLeather,
			EquipmentName.leatherArmor,
		];
	}

	constructor() {
		super(Proficiency.lightArmor);
	}
}
