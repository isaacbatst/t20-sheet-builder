import {Proficiency} from '../../../../../../Sheet/Proficiency';
import {EquipmentName} from '../../../../EquipmentName';
import {Armor} from '../Armor';

export abstract class HeavyArmor extends Armor {
	static getAll(): EquipmentName[] {
		return [
			EquipmentName.chainMail,
			EquipmentName.fullPlate,
		];
	}

	constructor() {
		super(Proficiency.heavyArmor);
	}
}
