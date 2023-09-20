import {Equipment} from '../Equipment';
import {EquipmentImprovementCategory} from '../EquipmentImprovement/EquipmentImprovementCategory';
import type {EquipmentName} from '../EquipmentName';

export class EquipmentClothing extends Equipment {
	override categoryForImprovement: EquipmentImprovementCategory = EquipmentImprovementCategory.toolsAndClothing;
	get isWieldable() {
		return false;
	}

	constructor(
		readonly name: EquipmentName,
		readonly price = 0,
	) {
		super();
	}
}
