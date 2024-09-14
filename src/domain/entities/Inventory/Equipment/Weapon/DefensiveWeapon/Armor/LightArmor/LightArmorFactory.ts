import {LightArmor} from './LightArmor';
import {type LightArmorName} from './LightArmorName';

export class LightArmorFactory {
	static make<N extends LightArmorName>(name: N): LightArmor<N> {
		return new LightArmor(name);
	}
}
