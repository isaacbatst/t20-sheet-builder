import {Equipment} from '../Equipment';
import type {EquipmentName} from '../EquipmentName';

export class EquipmentClothing extends Equipment {
	get isWieldable() {
		return false;
	}

	constructor(
		readonly name: EquipmentName,
	) {
		super();
	}
}
