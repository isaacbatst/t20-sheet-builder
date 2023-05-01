import {Equipment} from '../Equipment';
import type {EquipmentName} from '../EquipmentName';

export class EquipmentAdventure extends Equipment {
	constructor(
		readonly name: EquipmentName,
	) {
		super();
	}
}
