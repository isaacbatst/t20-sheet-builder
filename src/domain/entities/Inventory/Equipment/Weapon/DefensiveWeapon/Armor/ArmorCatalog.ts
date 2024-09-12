import {type ArmorData} from './ArmorData';
import {type ArmorName} from './ArmorName';
import {HeavyArmorCatalog} from './HeavyArmor/HeavyArmorCatalog';
import {LightArmorCatalog} from './LightArmor/LightArmorCatalog';

export class ArmorCatalog {
	static items: {
		[N in ArmorName]: ArmorData<N>
	} = {
			...HeavyArmorCatalog.items,
			...LightArmorCatalog.items,
		};
}
