import {Equipment} from '../Equipment';
import type {EquipmentName} from '../EquipmentName';

export class EquipmentClothing extends Equipment {
	constructor(
		readonly name: EquipmentName,
	) {
		super();
	}
}
