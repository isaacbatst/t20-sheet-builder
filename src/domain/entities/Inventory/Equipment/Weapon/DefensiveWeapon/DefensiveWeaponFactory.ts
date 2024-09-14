import {ArmorFactory, isArmorName} from './Armor';
import {type DefensiveWeapon} from './DefensiveWeapon';
import {type DefensiveWeaponName} from './DefensiveWeaponName';
import {isShieldName, ShieldFactory} from './Shield';

export class DefensiveWeaponFactory {
	static make<N extends DefensiveWeaponName>(name: N): DefensiveWeapon<N> {
		if (isShieldName(name)) {
			return ShieldFactory.make(name);
		}

		if (isArmorName(name)) {
			return ArmorFactory.make(name);
		}

		throw new Error(`Invalid defensive weapon name: ${name}`);
	}
}
