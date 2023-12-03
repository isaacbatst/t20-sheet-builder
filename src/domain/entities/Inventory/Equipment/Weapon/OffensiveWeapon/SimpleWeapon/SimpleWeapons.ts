import {Sickle} from './Sickle';
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
import {type SimpleWeaponName} from './SimpleWeaponName';
import {Horns} from './Horns';

export class SimpleWeapons {
	static map: Record<SimpleWeaponName, SimpleWeaponStatic> = {
		assegai: Assegai,
		baton: Baton,
		club: Club,
		dagger: Dagger,
		horns: Horns,
		lightCrossbow: LightCrossbow,
		mace: Mace,
		pike: Pike,
		sickle: Sickle,
		shortbow: Shortbow,
		shortSword: ShortSword,
		sling: Sling,
		spear: Spear,
		staffStick: StaffStick,
	};

	static getAll(): SimpleWeaponStatic[] {
		return Object.values(this.map);
	}

	static getByName(name: SimpleWeaponName): SimpleWeaponStatic {
		return this.map[name];
	}
}
