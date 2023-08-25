import {LeatherArmor} from './LeatherArmor';
import {type LightArmorName} from './LightArmorName';
import {type LightArmorStatic} from './LightArmorStatic';
import {StuddedLeatherArmor} from './StuddedLeatherArmor';

export class LightArmorFactory {
	static map: Record<LightArmorName, LightArmorStatic> = {
		leatherArmor: LeatherArmor,
		studdedLeather: StuddedLeatherArmor,
	};

	static getAll(): LightArmorStatic[] {
		return Object.values(this.map);
	}

	static getByName(name: LightArmorName): LightArmorStatic {
		return this.map[name];
	}
}
