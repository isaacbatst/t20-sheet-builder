import type {OffensiveWeaponStatic} from '../OffensiveWeaponStatic';
import {LongSword} from './LongSword';
import {Scythe} from './Scythe';

export class MartialWeapons {
	static getAll(): OffensiveWeaponStatic[] {
		return [
			LongSword,
			Scythe,
		];
	}
}
