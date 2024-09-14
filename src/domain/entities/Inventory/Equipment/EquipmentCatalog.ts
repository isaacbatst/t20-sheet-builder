import {EquipmentAdventureCatalog} from './EquipmentAdventure/EquipmentAdventureCatalog';
import {EquipmentAlchemicCatalog} from './EquipmentAlchemic/EquipmentAlchemicCatalog';
import {EquipmentsAnimalCatalog} from './EquipmentAnimal/EquipmentAnimalCatalog';
import {EquipmentsClothingCatalog} from './EquipmentClothing/EquipmentClothingCatalog';
import {EquipmentData} from './EquipmentData';
import {EquipmentName} from './EquipmentName';
import {EquipmentToolCatalog} from './EquipmentTool/EquipmentToolCatalog';
import {DefensiveWeaponCatalog} from './Weapon/DefensiveWeapon/DefensiveWeaponCatalog';
import {OffensiveWeaponCatalog} from './Weapon/OffensiveWeapon/OffensiveWeaponCatalog';

export class EquipmentCatalog {
	static readonly items: {
		[N in EquipmentName]: EquipmentData<N>;
	} = {
			...EquipmentAlchemicCatalog.items,
			...EquipmentAdventureCatalog.items,
			...EquipmentsAnimalCatalog.items,
			...EquipmentsClothingCatalog.items,
			...EquipmentToolCatalog.items,
			...OffensiveWeaponCatalog.items,
			...DefensiveWeaponCatalog.items,
			familyJewel: new EquipmentData({
				description: 'Uma joia de família, que pode ser vendida por T$300',
				equipmentName: EquipmentName.familyJewel,
				improvementCategory: null,
				price: 300,
				translatedName: 'Jóia de Família',
				usageLimitType: null,
			}),
			wizardFocus: new EquipmentData({
				description: 'Uma varinha, cajado, chapéu...',
				equipmentName: EquipmentName.wizardFocus,
				improvementCategory: null,
				price: 100,
				translatedName: 'Foco do Bruxo',
				usageLimitType: 'wield',
				slots: 1,
			}),
		};

	static get<N extends EquipmentName>(name: N): EquipmentData<N> {
		return EquipmentCatalog.items[name];
	}
}
