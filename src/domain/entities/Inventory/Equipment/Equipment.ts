import {type CharacterModifiers} from '../../Character/CharacterModifiers';
import {type SerializedSheetEquipment} from '../../Sheet';
import {type EquipmentImprovement} from './EquipmentImprovement/EquipmentImprovement';
import {EquipmentImprovementCategory} from './EquipmentImprovement/EquipmentImprovementCategory';
import type {EquipmentName} from './EquipmentName';

export abstract class Equipment<T extends EquipmentName = EquipmentName> {
	readonly improvements: EquipmentImprovement[] = [];
	abstract readonly name: T;
	abstract readonly isWieldable: boolean;
	// eslint-disable-next-line @typescript-eslint/ban-types
	abstract readonly categoryForImprovement: EquipmentImprovementCategory | null;

	addImprovement(improvement: EquipmentImprovement): void {
		if (improvement.category !== EquipmentImprovementCategory.all
		&& improvement.category !== this.categoryForImprovement) {
			throw new Error(`Improvement ${improvement.name} is not compatible with ${this.name}`);
		}

		this.improvements.push(improvement);
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
