import {HeavyArmor} from './HeavyArmor';
import {type HeavyArmorName} from './HeavyArmorName';

export class HeavyArmorFactory {
	static make<N extends HeavyArmorName>(name: N): HeavyArmor<N> {
		return new HeavyArmor(name);
	}
}
