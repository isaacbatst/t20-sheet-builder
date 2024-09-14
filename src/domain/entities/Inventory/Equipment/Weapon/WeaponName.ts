import {type DefensiveWeaponName, isDefensiveWeaponName} from './DefensiveWeapon';
import {isOffensiveWeaponName, type OffensiveWeaponName} from './OffensiveWeapon/OffensiveWeaponName';

export type WeaponName = DefensiveWeaponName | OffensiveWeaponName;

export const isWeaponName = (name: string): name is WeaponName => isDefensiveWeaponName(name) || isOffensiveWeaponName(name);
