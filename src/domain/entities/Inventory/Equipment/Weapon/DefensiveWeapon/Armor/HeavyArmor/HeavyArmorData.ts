import {ArmorData, type ArmorDataParams} from '../ArmorData';
import {type HeavyArmorName} from './HeavyArmorName';

type HeavyArmorDataParams<
	N extends HeavyArmorName,
> = Omit<ArmorDataParams<N>, 'slots'>;

export class HeavyArmorData<N extends HeavyArmorName> extends ArmorData<N> {
	constructor(params: HeavyArmorDataParams<N>) {
		super({
			...params,
			slots: 5,
		});
	}
}
