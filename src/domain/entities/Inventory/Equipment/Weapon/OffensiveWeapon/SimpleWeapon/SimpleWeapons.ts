import {Club} from './Club';
import {Dagger} from './Dagger';
import {type SimpleWeaponStatic} from './SimpleWeaponStatic';

export class SimpleWeapons {
	static getAll(): SimpleWeaponStatic[] {
		return [
			Dagger,
			Club,
		];
	}
}
