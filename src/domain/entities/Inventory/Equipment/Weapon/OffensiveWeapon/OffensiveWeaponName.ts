import {type ExoticWeaponName} from './ExoticWeapon';
import {type FireArmWeaponName} from './FireArmWeapon';
import {type MartialWeaponName} from './MartialWeapon';
import {type SimpleWeaponName} from './SimpleWeapon';

export type OffensiveWeaponName =
  SimpleWeaponName
  | MartialWeaponName
  | FireArmWeaponName
  | ExoticWeaponName;
