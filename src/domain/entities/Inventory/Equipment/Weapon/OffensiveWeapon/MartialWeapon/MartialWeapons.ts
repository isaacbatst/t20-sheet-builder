import {LongSword} from './LongSword';
import {type MartialWeaponStatic} from './MartialWeaponStatic';
import {Scythe} from './Scythe';

export class MartialWeapons {
	static getAll(): MartialWeaponStatic[] {
		return [
			LongSword,
			Scythe,
		];
	}
}
