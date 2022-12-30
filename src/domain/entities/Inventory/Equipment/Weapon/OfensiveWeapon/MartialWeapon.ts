import {Proficiency} from '../../../../Sheet/Proficiency';
import type {EquipmentName} from '../../EquipmentName';
import {Weapon} from '../Weapon';

export class MartialWeapon extends Weapon {
	constructor(name: EquipmentName) {
		super(name, Proficiency.martial, 'offensive');
	}
}
