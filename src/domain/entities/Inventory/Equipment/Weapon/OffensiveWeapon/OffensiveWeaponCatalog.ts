import {ExoticWeaponCatalog} from './ExoticWeapon/ExoticWeaponCatalog';
import {FireArmWeaponCatalog} from './FireArmWeapon/FireArmWeaponCatalog';
import {MartialWeaponCatalog} from './MartialWeapon/MartialWeaponCatalog';
import {type OffensiveWeaponData} from './OffensiveWeaponData';
import {type OffensiveWeaponName} from './OffensiveWeaponName';
import {SimpleWeaponCatalog} from './SimpleWeapon/SimpleWeaponCatalog';

export class OffensiveWeaponCatalog {
	static items: {
		[N in OffensiveWeaponName]: OffensiveWeaponData<N>;
	} = {
			...SimpleWeaponCatalog.items,
			...MartialWeaponCatalog.items,
			...ExoticWeaponCatalog.items,
			...FireArmWeaponCatalog.items,
		};
}
