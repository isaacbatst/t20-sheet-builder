import {EquipmentImprovement} from './EquipmentImprovement';
import {ImprovementCategory} from './EquipmentImprovementCategory';
import {EquipmentImprovementName} from './EquipmentImprovementName';

export class Reinforced extends EquipmentImprovement {
	override name: EquipmentImprovementName = EquipmentImprovementName.reinforced;
	override description = '+1 na penalidade de armadura e +1 na defesa';
	override category: ImprovementCategory = ImprovementCategory.armorAndShield;
}
