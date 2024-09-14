import {type Armor} from './Armor';
import {type ArmorName} from './ArmorName';
import {HeavyArmor, isHeavyArmorName} from './HeavyArmor';
import {isLightArmorName, LightArmor} from './LightArmor';

export class ArmorFactory {
	static make<N extends ArmorName>(name: N): Armor<N> {
		if (isLightArmorName(name)) {
			return new LightArmor(name);
		}

		if (isHeavyArmorName(name)) {
			return new HeavyArmor(name);
		}

		throw new Error(`Unknown armor name: ${name}`);
	}
}
