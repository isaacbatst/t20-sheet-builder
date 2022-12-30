import type {Equipment} from './Equipment/Equipment';

export class Inventory {
	equipments: Equipment[] = [];

	addEquipment(equipment: Equipment) {
		this.equipments.push(equipment);
	}
}
