import type {WeaponType} from '../Weapon';
import {Weapon} from '../Weapon';

export abstract class DefensiveWeapon extends Weapon {
	get type(): WeaponType {
		return 'defensive';
	}
}
