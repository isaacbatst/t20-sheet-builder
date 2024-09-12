import {Proficiency} from '../../../../../../Sheet/Proficiency';
import {Armor} from '../Armor';
import {type HeavyArmorData} from './HeavyArmorData';
import {type HeavyArmorName} from './HeavyArmorName';

export class HeavyArmor<
	N extends HeavyArmorName = HeavyArmorName,
	D extends HeavyArmorData<N> = HeavyArmorData<N>,
> extends Armor<N, D> {
	constructor(
		name: N,
	) {
		super(name, Proficiency.heavyArmor);
	}
}
