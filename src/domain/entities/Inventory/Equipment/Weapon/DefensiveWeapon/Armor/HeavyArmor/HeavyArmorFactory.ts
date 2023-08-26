import {type HeavyArmorName} from './HeavyArmorName';
import {HeavyArmors} from './HeavyArmors';

export class HeavyArmorFactory {
	static make(name: HeavyArmorName) {
		return new (HeavyArmors.get(name))();
	}
}
