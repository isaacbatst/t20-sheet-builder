import {Scythe} from './Scythe';
import {Assegai} from './Assegai';
import {Baton} from './Baton';
import {Club} from './Club';
import {Dagger} from './Dagger';
import {LightCrossbow} from './LightCrossbow';
import {Mace} from './Mace';
import {Pike} from './Pike';
import {ShortSword} from './ShortSword';
import {Shortbow} from './Shortbow';
import {type SimpleWeaponStatic} from './SimpleWeaponStatic';
import {Sling} from './Sling';
import {Spear} from './Spear';
import {StaffStick} from './Staff';

export class SimpleWeapons {
	static getAll(): SimpleWeaponStatic[] {
		return [
			Assegai,
			Baton,
			Club,
			Dagger,
			LightCrossbow,
			Mace,
			Pike,
			Scythe,
			Shortbow,
			ShortSword,
			Sling,
			Spear,
			StaffStick,
		];
	}
}
