import {EquipmentImprovement} from './EquipmentImprovement';
import {EquipmentImprovementCategory} from './EquipmentImprovementCategory';
import {EquipmentImprovementName} from './EquipmentImprovementName';

export class Cruel extends EquipmentImprovement {
	override name: EquipmentImprovementName = EquipmentImprovementName.cruel;
	override description = '+1 nas rolagens de dano';
	override category: EquipmentImprovementCategory = EquipmentImprovementCategory.weapon;
}
