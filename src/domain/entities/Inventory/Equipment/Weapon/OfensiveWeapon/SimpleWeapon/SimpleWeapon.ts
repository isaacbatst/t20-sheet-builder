import {Proficiency} from '../../../../../Sheet/Proficiency';
import {EquipmentName} from '../../../EquipmentName';
import {OffensiveWeapon} from '../OffensiveWeapon';

export abstract class SimpleWeapon extends OffensiveWeapon {
	static getAll(): EquipmentName[] {
		return [EquipmentName.dagger, EquipmentName.club];
	}

	constructor() {
		super(Proficiency.simple);
	}
}
