import {ArmorCatalog} from './Armor/ArmorCatalog';
import {type DefensiveWeaponData} from './DefensiveWeaponData';
import {type DefensiveWeaponName} from './DefensiveWeaponName';
import {ShieldCatalog} from './Shield/ShieldCatalog';

export class DefensiveWeaponCatalog {
	static map: {
		[N in DefensiveWeaponName]: DefensiveWeaponData<N>;
	} = {
			...ArmorCatalog.items,
			...ShieldCatalog.items,
		};
}
