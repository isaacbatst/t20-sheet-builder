import {type SerializedSheetInventoryEquipment} from '../Sheet';
import type {Equipment} from './Equipment';

export class InventoryEquipment {
	private isEquipped = false;
	constructor(
		readonly equipment: Equipment,
	) {}

	toggleEquipped(): void {
		this.isEquipped = !this.isEquipped;
	}

	getIsEquipped(): boolean {
		return this.isEquipped;
	}

	serialize(): SerializedSheetInventoryEquipment {
		return {
			name: this.equipment.name,
			isEquipped: this.getIsEquipped(),
		};
	}
}
