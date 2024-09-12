import {EquipmentsAdventureData} from './EquipmentAdventure/EquipmentsAdventureData';
import {EquipmentsAlchemicData} from './EquipmentAlchemic/EquipmentsAlchemicData';
import {EquipmentsAnimalData} from './EquipmentAnimal/EquipmentsAnimalData';
import {EquipmentsClothingData} from './EquipmentClothing/EquipmentsClothingData';
import {EquipmentData} from './EquipmentData';
import {EquipmentName} from './EquipmentName';
import {EquipmentsToolData} from './EquipmentTool/EquipmentsToolData';
import {DefensiveWeaponCatalog} from './Weapon/DefensiveWeapon/DefensiveWeaponCatalog';
import {OffensiveWeaponsData} from './Weapon/OffensiveWeapon/OffensiveWeaponsData';

export class EquipmentsData {
	static readonly map: {
		[N in EquipmentName]: EquipmentData<N>;
	} = {
			...EquipmentsAlchemicData.map,
			...EquipmentsAdventureData.map,
			...EquipmentsAnimalData.map,
			...EquipmentsClothingData.map,
			...EquipmentsToolData.map,
			...OffensiveWeaponsData.map,
			...DefensiveWeaponCatalog.map,
			familyJewel: new EquipmentData({
				description: 'Uma joia de família, que pode ser vendida por T$300',
				equipmentName: EquipmentName.familyJewel,
				improvementCategory: null,
				price: 1000,
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
		return EquipmentsData.map[name];
	}
}
