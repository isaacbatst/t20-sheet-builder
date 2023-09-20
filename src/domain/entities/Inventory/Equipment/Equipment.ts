import {type CharacterModifiers} from '../../Character/CharacterModifiers';
import {type SerializedSheetEquipment} from '../../Sheet';
import {type EquipmentImprovement} from './EquipmentImprovement/EquipmentImprovement';
import {EquipmentImprovementCategory} from './EquipmentImprovement/EquipmentImprovementCategory';
import type {EquipmentName} from './EquipmentName';

export abstract class Equipment<T extends EquipmentName = EquipmentName> {
	static improvementPrices = [300, 3000, 9000, 18000];

	readonly improvements: EquipmentImprovement[] = [];
	abstract readonly name: T;
	abstract readonly isWieldable: boolean;
	abstract price: number;
	// eslint-disable-next-line @typescript-eslint/ban-types
	abstract readonly categoryForImprovement: EquipmentImprovementCategory | null;

	addImprovement(improvement: EquipmentImprovement): void {
		if (improvement.category !== EquipmentImprovementCategory.all
		&& improvement.category !== this.categoryForImprovement) {
			throw new Error(`Improvement ${improvement.name} is not compatible with ${this.name}`);
		}

		if (this.improvements.length >= 4) {
			throw new Error(`Equipment ${this.name} already has 4 improvements`);
		}

		this.improvements.push(improvement);
	}

	getTotalPrice(): number {
		return this.price + this.improvements.reduce((total, improvement, index) => {
			const price = Equipment.improvementPrices[index];
			return total + price;
		}, 0);
	}

	serialize(): SerializedSheetEquipment<T> {
		return {
			name: this.name,
		};
	}

	onEquip(modifiers: CharacterModifiers): void {
		console.log('onEquip', this.name);
	}

	onUnequip(modifiers: CharacterModifiers): void {
		console.log('onUnequip', this.name);
	}
}
