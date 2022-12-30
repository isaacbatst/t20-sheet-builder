import {Proficiency} from '../../../../Sheet/Proficiency';
import type {EquipmentName} from '../../EquipmentName';
import {Weapon} from '../Weapon';

export class SimpleWeapon extends Weapon {
	constructor(name: EquipmentName) {
		super(name, Proficiency.simple, 'offensive');
	}
}
