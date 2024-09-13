import {EquipmentName} from '../EquipmentName';
import {EquipmentClothingData} from './EquipmentClothingData';
import {type EquipmentClothingName} from './EquipmentClothingName';

export class EquipmentsClothingCatalog {
	static items: {
		[N in EquipmentClothingName]: EquipmentClothingData<N>;
	} = {
			travelerCostume: new EquipmentClothingData({
				description: 'Inclui botas, calças ou'
        + ' saias, cinto, camisa de linho e capa com capuz. A'
        + ' roupa padrão de aventureiros.',
				equipmentName: EquipmentName.travelerCostume,
				price: 10,
				translatedName: 'Traje de Viajante',
				slots: null,
				usageLimitType: null,
			}),
			priestCostume: new EquipmentClothingData({
				description: 'Traje fornecido pela origem Acólito.',
				equipmentName: EquipmentName.priestCostume,
				price: 0,
				translatedName: 'Traje de Sacerdote',
				slots: null,
				usageLimitType: null,
			}),
		};
}
