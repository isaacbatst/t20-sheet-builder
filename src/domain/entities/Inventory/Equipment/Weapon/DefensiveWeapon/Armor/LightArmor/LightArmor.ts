import {Proficiency} from '../../../../../../Sheet/Proficiency';
import {Armor} from '../Armor';
import {type LightArmorData} from './LightArmorData';
import {type LightArmorName} from './LightArmorName';

export class LightArmor<
	N extends LightArmorName = LightArmorName,
	D extends LightArmorData<N> = LightArmorData<N>,
> extends Armor<N, D> {
	constructor(
		name: N,
	) {
		super(name, Proficiency.lightArmor);
	}
}
