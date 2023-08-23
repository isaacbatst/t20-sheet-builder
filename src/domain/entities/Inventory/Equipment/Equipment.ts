import {type CharacterModifiers} from '../../Character/CharacterModifiers';
import {type SerializedSheetEquipment} from '../../Sheet';
import type {EquipmentName} from './EquipmentName';

export abstract class Equipment<T extends EquipmentName = EquipmentName> {
	abstract readonly name: EquipmentName;
	abstract readonly isWieldable: boolean;

	serialize(): SerializedSheetEquipment<T> {
		return {
			name: this.name as T,
		};
	}

	onEquip(modifiers: CharacterModifiers): void {
		console.log('onEquip', this.name);
	}

	onUnequip(modifiers: CharacterModifiers): void {
		console.log('onUnequip', this.name);
	}
}
