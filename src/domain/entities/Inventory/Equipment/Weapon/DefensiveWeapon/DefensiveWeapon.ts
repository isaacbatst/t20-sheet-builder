import type {Proficiency} from '../../../../Sheet/Proficiency';
import type {EquipmentName} from '../../EquipmentName';
import {Weapon} from '../Weapon';

export class DefensiveWeapon extends Weapon {
	constructor(name: EquipmentName, proficiency: Proficiency) {
		super(name, proficiency, 'defensive');
	}
}
