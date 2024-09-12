import {EquipmentData} from '../EquipmentData';
import {ImprovementCategory} from '../EquipmentImprovement/EquipmentImprovementCategory';
import {EquipmentName} from '../EquipmentName';
import {EquipmentClothingData} from './EquipmentClothingData';
import {type EquipmentClothingName} from './EquipmentClothingName';

export class EquipmentsClothingData {
	static map: {
		[N in EquipmentClothingName]: EquipmentClothingData<N>;
	} = {
			travelerCostume: new EquipmentClothingData({
				description: 'Inclui botas, calças ou'
        + ' saias, cinto, camisa de linho e capa com capuz. A'
        + ' roupa padrão de aventureiros.',
				equipmentName: EquipmentName.travelerCostume,
				price: 10,
				translatedName: 'Traje de Viajante',
				improvementCategory: null,
				slots: null,
				usageLimitType: null,
			}),
			priestCostume: new EquipmentData({
				description: 'Traje fornecido pela origem Acólito.',
				equipmentName: EquipmentName.priestCostume,
				price: 0,
				translatedName: 'Traje de Sacerdote',
				improvementCategory: null,
				slots: null,
				usageLimitType: null,
			}),
		};
}
