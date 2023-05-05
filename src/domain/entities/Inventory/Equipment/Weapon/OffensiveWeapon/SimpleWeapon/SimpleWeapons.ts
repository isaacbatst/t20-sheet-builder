import type {OffensiveWeaponStatic} from '../OffensiveWeaponStatic';
import {Club} from './Club';
import {Dagger} from './Dagger';

export class SimpleWeapons {
	static getAll(): OffensiveWeaponStatic[] {
		return [
			Dagger,
			Club,
		];
	}
}
