
import {type FireArmWeaponName} from './FireArmWeaponName';
import {type FireArmWeaponStatic} from './FireArmWeaponStatic';
import {Musket} from './Musket';
import {Pistol} from './Pistol';

export class FireArmWeapons {
	static map: Record<FireArmWeaponName, FireArmWeaponStatic> = {
		pistol: Pistol,
		musket: Musket,
	};

	static getAll(): FireArmWeaponStatic[] {
		return Object.values(this.map);
	}

	static getByName(name: FireArmWeaponName): FireArmWeaponStatic {
		return this.map[name];
	}
}
