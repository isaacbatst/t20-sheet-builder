import {EquipmentImprovement} from './EquipmentImprovement';
import {EquipmentImprovementCategory} from './EquipmentImprovementCategory';
import {EquipmentImprovementName} from './EquipmentImprovementName';

export class Accurate extends EquipmentImprovement {
	override name = EquipmentImprovementName.accurate;
	override description = '+1 nos testes de ataque';
	override category = EquipmentImprovementCategory.weapon;
}
