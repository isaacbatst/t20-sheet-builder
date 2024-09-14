import {isArmorName, type ArmorName} from './Armor';
import {isShieldName, type ShieldName} from './Shield/ShieldName';

export type DefensiveWeaponName =
  | ArmorName
  | ShieldName;

export const isDefensiveWeaponName = (name: string): name is DefensiveWeaponName => isArmorName(name) || isShieldName(name);
