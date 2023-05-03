import type {EquipmentName} from './Equipment';
import type {Equipment} from './Equipment/Equipment';
import {InventoryEquipment} from './InventoryEquipment';

export class Inventory {
	equipments = new Map<EquipmentName, InventoryEquipment>();

	addEquipment(equipment: Equipment) {
		this.equipments.set(equipment.name, new InventoryEquipment(equipment));
	}

	getItem(name: EquipmentName) {
		return this.equipments.get(name);
	}

	toggleEquippedItem(name: EquipmentName) {
		const item = this.equipments.get(name);

		if (item) {
			item.toggleEquipped();
		}
	}

	getWieldedItems(): EquipmentName[] {
		return Array.from(this.equipments.values())
			.filter(item => item.getIsEquipped())
			.map(item => item.equipment.name);
	}
}
