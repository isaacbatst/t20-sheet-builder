import {Proficiency} from '../../../../../Sheet/Proficiency';
import {EquipmentName} from '../../../EquipmentName';
import {OffensiveWeapon} from '../OffensiveWeapon';

export abstract class MartialWeapon extends OffensiveWeapon {
	static getAll(): EquipmentName[] {
		return [
			EquipmentName.longSword,
			EquipmentName.scythe,
		];
	}

	constructor() {
		super(Proficiency.martial);
	}
}
