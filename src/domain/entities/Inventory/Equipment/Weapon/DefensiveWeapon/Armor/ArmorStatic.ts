import type {DefensiveWeaponStatic} from '../DefensiveWeaponStatic';
import type {Armor} from './Armor';
import {type ArmorName} from './ArmorName';

export type ArmorStatic<
	N extends ArmorName = ArmorName,
	A extends Armor<N> = Armor<N>,
> = DefensiveWeaponStatic<N, A>;
