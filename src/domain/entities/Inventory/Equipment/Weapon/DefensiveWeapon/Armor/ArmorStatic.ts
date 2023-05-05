import type {DefensiveWeaponStatic} from '../DefensiveWeaponStatic';
import type {Armor} from './Armor';

export type ArmorStatic = DefensiveWeaponStatic & (new(...args: any[]) => Armor);
