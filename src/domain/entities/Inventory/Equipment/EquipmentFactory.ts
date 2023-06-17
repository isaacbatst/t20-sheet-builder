import {Dagger, type Equipment, EquipmentName, Club} from '.';
import {SheetBuilderError} from '../../Error';
import {type SerializedSheetEquipment} from '../../Sheet';

export class EquipmentFactory {
	static	makeFromSerialized(serialized: SerializedSheetEquipment): Equipment {
		if (serialized.name === EquipmentName.dagger) {
			return new Dagger();
		}

		if (serialized.name === EquipmentName.club) {
			return new Club();
		}

		throw new SheetBuilderError('UNKNOWN_EQUIPMENT');
	}
}
