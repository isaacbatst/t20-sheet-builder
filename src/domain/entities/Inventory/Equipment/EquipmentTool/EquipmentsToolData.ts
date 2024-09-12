import {EquipmentData} from '../EquipmentData';
import {ImprovementCategory} from '../EquipmentImprovement/EquipmentImprovementCategory';
import {EquipmentName} from '../EquipmentName';
import {type EquipmentToolName} from './EquipmentToolName';

export class EquipmentsToolData {
	static map: {
		[N in EquipmentToolName]: EquipmentData<N>;
	} = {
			disguiseKit: new EquipmentData({
				description: 'Um conjunto de'
      + ' cosméticos, tintas para cabelo e algumas próteses'
      + ' simples (como bigodes e narizes falsos). Um perso'
      + ' nagem sem este item sofre –5 em testes de Engana'
      + ' ção para disfarce.',
				equipmentName: EquipmentName.disguiseKit,
				improvementCategory: ImprovementCategory.toolsAndClothing,
				price: 50,
				translatedName: 'Estojo de Disfarce',
				usageLimitType: 'dress',
			}),
		};
}
