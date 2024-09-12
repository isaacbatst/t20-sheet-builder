import {ArmorData, type ArmorDataParams} from '../ArmorData';
import {type LightArmorName} from './LightArmorName';

type LightArmorDataParams<
	N extends LightArmorName,
> = Omit<ArmorDataParams<N>, 'slots'>;

export class LightArmorData<N extends LightArmorName> extends ArmorData<N> {
	constructor(params: LightArmorDataParams<N>) {
		super({
			...params,
			slots: 2,
		});
	}
}
