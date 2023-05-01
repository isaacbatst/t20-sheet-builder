import type {Proficiency} from '../../../../Sheet/Proficiency';
import type {EquipmentName} from '../../EquipmentName';
import {DefensiveWeapon} from './DefensiveWeapon';

export abstract class Armor extends DefensiveWeapon {
	constructor(override readonly proficiency: Proficiency.lightArmor | Proficiency.heavyArmor) {
		super(proficiency);
	}
}
