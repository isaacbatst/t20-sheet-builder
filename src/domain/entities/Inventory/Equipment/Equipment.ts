import {type CharacterModifiers} from '../../Character/CharacterModifiers';
import {type SerializedSheetEquipment} from '../../Sheet/SerializedSheet/SerializedSheetInterface';
import {type EquipmentData} from './EquipmentData';
import {type EquipmentImprovement} from './EquipmentImprovement/EquipmentImprovement';
import {ImprovementCategory} from './EquipmentImprovement/EquipmentImprovementCategory';
import type {EquipmentName} from './EquipmentName';
import {EquipmentCatalog} from './EquipmentCatalog';

export class Equipment<
	N extends EquipmentName = EquipmentName,
	D extends EquipmentData<N> = EquipmentData<N>,
> {
	static improvementPrices = [300, 3000, 9000, 18000];

	readonly data: D;
	readonly improvements: EquipmentImprovement[] = [];

	constructor(
		name: N,
	) {
		this.data = EquipmentCatalog.get(name) as D;
	}

	get name(): N {
		return this.data.equipmentName;
	}

	get description(): string {
		return this.data.description;
	}

	get price(): number {
		return this.data.price;
	}

	get improvementCategory(): ImprovementCategory | null {
		return this.data.improvementCategory;
	}

	get isWieldable(): boolean {
		return this.data.usageLimitType === 'wield';
	}

	addImprovement(improvement: EquipmentImprovement): void {
		if (improvement.category !== ImprovementCategory.all
		&& improvement.category !== this.improvementCategory) {
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

	serialize(): SerializedSheetEquipment<N> {
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
