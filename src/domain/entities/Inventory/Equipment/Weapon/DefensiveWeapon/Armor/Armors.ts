import {type ArmorName} from './ArmorName';
import {HeavyArmors} from './HeavyArmor';
import {LightArmors} from './LightArmor';

export class Armors {
	static map = {
		...LightArmors.map,
		...HeavyArmors.map,
	};

	static get(name: ArmorName) {
		return Armors.map[name];
	}

	static getAll() {
		return Object.values(Armors.map);
	}
}
