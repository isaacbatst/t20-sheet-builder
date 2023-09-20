import {Equipment} from '../Equipment';
import type {EquipmentName} from '../EquipmentName';

export class EquipmentAnimal extends Equipment {
	override categoryForImprovement = null;

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
