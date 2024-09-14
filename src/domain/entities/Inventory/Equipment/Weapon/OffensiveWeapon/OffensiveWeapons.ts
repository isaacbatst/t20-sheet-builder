import {ExoticWeapons} from './ExoticWeapon';
import {FireArmWeapons} from './FireArmWeapon';
import {MartialWeapons} from './MartialWeapon';
import {SimpleWeapons} from './SimpleWeapon';

export class OffensiveWeapons {
	static map = {
		...ExoticWeapons.map,
		...FireArmWeapons.map,
		...MartialWeapons.map,
		...SimpleWeapons.map,
	};
}
