import {type CharacterModifiers} from '../Character/CharacterModifiers';
import {type SerializedSheetInventoryEquipment} from '../Sheet';
import type {Equipment} from './Equipment';

export class InventoryEquipment<T extends Equipment = Equipment> {
	constructor(
		readonly equipment: T,
		private isEquipped = false,
	) {}

	toggleEquipped(modifiers: CharacterModifiers): void {
		this.isEquipped = !this.isEquipped;

		if (this.isEquipped) {
			this.equipment.onEquip(modifiers);
		}

		if (!this.isEquipped) {
			this.equipment.onUnequip(modifiers);
		}
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
