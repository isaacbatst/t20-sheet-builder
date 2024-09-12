import {EquipmentImprovement} from './EquipmentImprovement';
import {ImprovementCategory} from './EquipmentImprovementCategory';
import {EquipmentImprovementName} from './EquipmentImprovementName';

export class Accurate extends EquipmentImprovement {
	override name = EquipmentImprovementName.accurate;
	override description = '+1 nos testes de ataque';
	override category = ImprovementCategory.weapon;
}
