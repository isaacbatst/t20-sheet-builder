import {type ArmorName} from './ArmorName';
import {HeavyArmor, isHeavyArmorName} from './HeavyArmor';
import {isLightArmorName, LightArmor} from './LightArmor';

export class ArmorFactory {
	static make(name: ArmorName) {
		if (isLightArmorName(name)) {
			return new LightArmor(name);
		}

		if (isHeavyArmorName(name)) {
			return new HeavyArmor(name);
		}
	}
}
