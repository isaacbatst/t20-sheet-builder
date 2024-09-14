import {isDefensiveWeaponName} from './DefensiveWeapon';
import {DefensiveWeaponFactory} from './DefensiveWeapon/DefensiveWeaponFactory';
import {OffensiveWeaponFactory} from './OffensiveWeapon/OffensiveWeaponFactory';
import {isOffensiveWeaponName} from './OffensiveWeapon/OffensiveWeaponName';
import {type Weapon} from './Weapon';
import {type WeaponName} from './WeaponName';

export class WeaponFactory {
	static make<N extends WeaponName>(name: N): Weapon<N> {
		if (isOffensiveWeaponName(name)) {
			return OffensiveWeaponFactory.make(name);
		}

		if (isDefensiveWeaponName(name)) {
			return DefensiveWeaponFactory.make(name);
		}

		throw new Error(`Invalid weapon name: ${name}`);
	}
}
