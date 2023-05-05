import {Proficiency} from '../../../../../Sheet/Proficiency';
import {OffensiveWeapon} from '../OffensiveWeapon';
import type {OffensiveWeaponStatic} from '../OffensiveWeaponStatic';
import {LongSword} from './LongSword';
import {Scythe} from './Scythe';

export abstract class MartialWeapon extends OffensiveWeapon {
	static getAll(): OffensiveWeaponStatic[] {
		return [
			LongSword,
			Scythe,
		];
	}

	constructor() {
		super(Proficiency.martial);
	}
}
