import {Weapon} from '../Weapon';
import {type OffensiveWeaponData} from './OffensiveWeaponData';
import {type OffensiveWeaponName} from './OffensiveWeaponName';

export abstract class OffensiveWeapon<
	T extends OffensiveWeaponName = OffensiveWeaponName,
	D extends OffensiveWeaponData<T> = OffensiveWeaponData<T>,
> extends Weapon<T, D> {}
