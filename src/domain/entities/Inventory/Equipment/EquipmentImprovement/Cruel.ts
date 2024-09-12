import {EquipmentImprovement} from './EquipmentImprovement';
import {ImprovementCategory} from './EquipmentImprovementCategory';
import {EquipmentImprovementName} from './EquipmentImprovementName';

export class Cruel extends EquipmentImprovement {
	override name: EquipmentImprovementName = EquipmentImprovementName.cruel;
	override description = '+1 nas rolagens de dano';
	override category: ImprovementCategory = ImprovementCategory.weapon;
}
