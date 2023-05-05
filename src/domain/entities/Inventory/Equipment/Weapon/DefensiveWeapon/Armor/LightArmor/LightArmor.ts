import {Proficiency} from '../../../../../../Sheet/Proficiency';
import {Armor} from '../Armor';
import type {ArmorStatic} from '../ArmorStatic';
import {LeatherArmor} from './LeatherArmor';
import {StuddedLeatherArmor} from './StuddedLeatherArmor';

export abstract class LightArmor extends Armor {
	static getAll(): ArmorStatic[] {
		return [
			StuddedLeatherArmor,
			LeatherArmor,
		];
	}

	constructor() {
		super(Proficiency.lightArmor);
	}
}
