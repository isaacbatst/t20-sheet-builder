import {type LightArmorName} from './LightArmorName';
import {LightArmors} from './LightArmors';

export class LightArmorFactory {
	static make(name: LightArmorName) {
		return new (LightArmors.get(name))();
	}
}
