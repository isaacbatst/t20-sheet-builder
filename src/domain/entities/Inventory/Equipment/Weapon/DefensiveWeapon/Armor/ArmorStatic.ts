import type {DefensiveWeaponStatic} from '../DefensiveWeaponStatic';
import type {Armor} from './Armor';

export type ArmorStatic<T extends Armor = Armor> = DefensiveWeaponStatic<Armor>;
