
import {type OffensiveWeaponStatic} from '../OffensiveWeaponStatic';
import {type ExoticWeapon} from './ExoticWeapon';
import {type ExoticWeaponName} from './ExoticWeaponName';

export type ExoticWeaponStatic<
	N extends ExoticWeaponName = ExoticWeaponName,
	T extends ExoticWeapon<N> = ExoticWeapon<N>,
> = OffensiveWeaponStatic<N, T>;
