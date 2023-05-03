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
}
