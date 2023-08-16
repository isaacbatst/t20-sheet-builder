
import {type FireArmWeaponStatic} from './FireArmWeaponStatic';
import {Musket} from './Musket';
import {Pistol} from './Pistol';

export class FireArmWeapons {
	static getAll(): FireArmWeaponStatic[] {
		return [
			Pistol,
			Musket,
		];
	}
}
