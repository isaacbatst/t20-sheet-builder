import {Equipment} from '../Equipment';
import type {EquipmentName} from '../EquipmentName';

export class EquipmentAdventure extends Equipment {
	override categoryForImprovement = null;
	constructor(
		readonly name: EquipmentName,
		readonly isWieldable = false,
		readonly price = 0,
	) {
		super();
	}
}
