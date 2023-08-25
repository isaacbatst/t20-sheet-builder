import {type ArmorName} from './ArmorName';
import {HeavyArmorFactory} from './HeavyArmor';
import {LightArmorFactory} from './LightArmor';

export class ArmorFactory {
	static map = {
		...LightArmorFactory.map,
		...HeavyArmorFactory.map,
	};

	static get(name: ArmorName) {
		return this.map[name];
	}

	static getAll() {
		return Object.values(this.map);
	}
}
