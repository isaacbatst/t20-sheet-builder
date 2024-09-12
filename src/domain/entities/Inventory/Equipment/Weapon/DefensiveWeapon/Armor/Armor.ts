import {DefensiveWeapon} from '../DefensiveWeapon';
import {type ArmorData} from './ArmorData';
import {type ArmorName} from './ArmorName';

export abstract class Armor<
	N extends ArmorName = ArmorName,
	D extends ArmorData<N> = ArmorData<N>,
> extends DefensiveWeapon<N, D> {}
