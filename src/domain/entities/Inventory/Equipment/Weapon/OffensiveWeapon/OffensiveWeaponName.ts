import {isExoticWeaponName, type ExoticWeaponName} from './ExoticWeapon';
import {isFireArmWeaponName, type FireArmWeaponName} from './FireArmWeapon';
import {isMartialWeaponName, type MartialWeaponName} from './MartialWeapon';
import {isSimpleWeaponName, type SimpleWeaponName} from './SimpleWeapon';

export type OffensiveWeaponName =
  SimpleWeaponName
  | MartialWeaponName
  | FireArmWeaponName
  | ExoticWeaponName;

export const isOffensiveWeaponName = (name: string): name is OffensiveWeaponName =>
	isSimpleWeaponName(name)
  || isMartialWeaponName(name)
  || isFireArmWeaponName(name)
  || isExoticWeaponName(name);
