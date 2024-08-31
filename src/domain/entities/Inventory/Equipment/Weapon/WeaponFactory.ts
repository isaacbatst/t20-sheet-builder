import {type EquipmentName} from '../EquipmentName';
import {Armors} from './DefensiveWeapon/Armor/Armors';
import {Shields} from './DefensiveWeapon/Shield/Shields';
import {OffensiveWeapons} from './OffensiveWeapon/OffensiveWeapons';

export class WeaponFactory {
	static readonly weapons = {
		...OffensiveWeapons.map,
		...Armors.map,
		...Shields.map,
	};

	static make(name: EquipmentName) {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		const Weapon = WeaponFactory.weapons[name as keyof typeof WeaponFactory.weapons];

		if (!Weapon) {
			throw new Error('WEAPON_NOT_FOUND');
		}

		return new Weapon();
	}
}
