import type {Proficiency} from '../../../../Sheet/Proficiency';
import type {EquipmentName} from '../../EquipmentName';
import {DefensiveWeapon} from './DefensiveWeapon';

export class Armor extends DefensiveWeapon {
	constructor(name: EquipmentName, override readonly proficiency: Proficiency.lightArmor | Proficiency.heavyArmor) {
		super(name, proficiency);
	}
}
