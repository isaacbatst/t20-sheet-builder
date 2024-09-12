import {LightArmor} from './LightArmor';
import {type LightArmorName} from './LightArmorName';

export class LightArmorFactory {
	static make(name: LightArmorName) {
		return new LightArmor(name);
	}
}
