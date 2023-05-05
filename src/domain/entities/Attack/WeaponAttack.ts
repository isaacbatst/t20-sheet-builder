import type {OffensiveWeapon} from '../Inventory/Equipment/Weapon/OffensiveWeapon/OffensiveWeapon';
import {Attack} from './Attack';

export class WeaponAttack extends Attack {
	constructor(weapon: OffensiveWeapon) {
		super(weapon.damage, weapon.critical);
	}
}
