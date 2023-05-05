import type {ArmorStatic} from '../ArmorStatic';
import {LeatherArmor} from './LeatherArmor';
import {StuddedLeatherArmor} from './StuddedLeatherArmor';

export class LightArmors {
	static getAll(): ArmorStatic[] {
		return [
			StuddedLeatherArmor,
			LeatherArmor,
		];
	}
}
