import {type CharacterModifiers} from '../../Character/CharacterModifiers';
import {type SerializedSheetEquipment} from '../../Sheet';
import type {EquipmentName} from './EquipmentName';

export abstract class Equipment {
	abstract readonly name: EquipmentName;
	abstract readonly isWieldable: boolean;

	serialize(): SerializedSheetEquipment {
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
