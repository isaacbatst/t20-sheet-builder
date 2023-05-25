import {type SerializedSheetEquipment} from '../../Sheet';
import type {EquipmentName} from './EquipmentName';

export abstract class Equipment {
	abstract readonly name: EquipmentName;

	serialize(): SerializedSheetEquipment {
		return {
			name: this.name,
		};
	}
}
