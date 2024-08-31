import {type DefensiveWeaponStatic} from '../DefensiveWeaponStatic';
import {type Shield} from './Shield';
import {type ShieldName} from './ShieldName';

export type ShieldStatic = DefensiveWeaponStatic<
ShieldName,
Shield
>;

