import {EquipmentImprovement} from './EquipmentImprovement';
import {ImprovementCategory} from './EquipmentImprovementCategory';
import {EquipmentImprovementName} from './EquipmentImprovementName';

export class Fit extends EquipmentImprovement {
	override name: EquipmentImprovementName = EquipmentImprovementName.fit;
	override description = '-1 na penalidade de armadura';
	override category: ImprovementCategory = ImprovementCategory.armorAndShield;
}
