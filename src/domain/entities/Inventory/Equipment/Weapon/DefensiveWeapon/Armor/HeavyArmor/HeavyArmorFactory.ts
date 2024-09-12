import {HeavyArmor} from './HeavyArmor';
import {type HeavyArmorName} from './HeavyArmorName';

export class HeavyArmorFactory {
	static make(name: HeavyArmorName) {
		return new HeavyArmor(name);
	}
}
