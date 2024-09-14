import {ExoticWeapon, isExoticWeaponName} from './ExoticWeapon';
import {FireArmWeapon, isFireArmWeaponName} from './FireArmWeapon';
import {isMartialWeaponName, MartialWeapon} from './MartialWeapon';
import {type OffensiveWeapon} from './OffensiveWeapon';
import {type OffensiveWeaponName} from './OffensiveWeaponName';
import {isSimpleWeaponName, SimpleWeapon} from './SimpleWeapon';

export class OffensiveWeaponFactory {
	static make<N extends OffensiveWeaponName>(name: N): OffensiveWeapon<N> {
		if (isExoticWeaponName(name)) {
			return new ExoticWeapon(name);
		}

		if (isMartialWeaponName(name)) {
			return new MartialWeapon(name);
		}

		if (isFireArmWeaponName(name)) {
			return new FireArmWeapon(name);
		}

		if (isSimpleWeaponName(name)) {
			return new SimpleWeapon(name);
		}

		throw new Error(`Invalid weapon name: ${name}`);
	}
}
