import {Equipment} from '../Equipment';
import type {EquipmentName} from '../EquipmentName';

export class EquipmentAnimal extends Equipment {
	constructor(
		readonly name: EquipmentName,
	) {
		super();
	}
}
