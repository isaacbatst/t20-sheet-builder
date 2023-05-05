import type {WeaponType} from '../Weapon';
import {Weapon} from '../Weapon';

export abstract class DefensiveWeapon extends Weapon {
	abstract defenseBonus: number;
	abstract armorPenalty: number;
	abstract slots: number;
	get type(): WeaponType {
		return 'defensive';
	}
}
