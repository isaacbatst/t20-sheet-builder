import type {ArmorStatic} from '../ArmorStatic';
import {LeatherArmor} from './LeatherArmor';
import {type LightArmorName} from './LightArmorName';
import {type LightArmorStatic} from './LightArmorStatic';
import {StuddedLeatherArmor} from './StuddedLeatherArmor';

export class LightArmors {
	static map: Record<LightArmorName, LightArmorStatic> = {
		leatherArmor: LeatherArmor,
		studdedLeather: StuddedLeatherArmor,
	};

	static getAll(): ArmorStatic[] {
		return Object.values(LightArmors.map);
	}

	static get(name: LightArmorName): LightArmorStatic {
		return LightArmors.map[name];
	}
}
