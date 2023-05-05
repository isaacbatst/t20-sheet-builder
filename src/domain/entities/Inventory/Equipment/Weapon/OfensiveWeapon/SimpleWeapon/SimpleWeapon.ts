import {Proficiency} from '../../../../../Sheet/Proficiency';
import {OffensiveWeapon} from '../OffensiveWeapon';
import type {OffensiveWeaponStatic} from '../OffensiveWeaponStatic';
import {Club} from './Club';
import {Dagger} from './Dagger';

export abstract class SimpleWeapon extends OffensiveWeapon {
	static getAll(): OffensiveWeaponStatic[] {
		return [
			Dagger,
			Club,
		];
	}

	constructor() {
		super(Proficiency.simple);
	}
}
