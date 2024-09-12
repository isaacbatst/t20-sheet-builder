import {DefensiveWeaponData, type DefensiveWeaponParams} from '../DefensiveWeaponData';
import {type ArmorName} from './ArmorName';

export type ArmorDataParams<N extends ArmorName> = Omit<DefensiveWeaponParams<N>, 'usageLimitType'>;

export class ArmorData<N extends ArmorName> extends DefensiveWeaponData<N> {
	constructor(params: ArmorDataParams<N>) {
		super({
			...params,
			usageLimitType: 'dress',
		});
	}
}
