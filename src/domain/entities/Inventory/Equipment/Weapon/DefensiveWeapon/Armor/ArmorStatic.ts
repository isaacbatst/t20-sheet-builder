import type {DefensiveWeaponStatic} from '../DefensiveWeaponStatic';
import type {Armor} from './Armor';
import {type ArmorName} from './ArmorName';

export type ArmorStatic<
	T extends Armor = Armor,
	E extends ArmorName = ArmorName,
> = DefensiveWeaponStatic<T, E>;
