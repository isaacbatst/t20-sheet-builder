import {type SimpleWeapon, type Equipment} from '../../..';
import {SheetBuilderError} from '../../../../../Error';
import {type SerializedSheetEquipment} from '../../../../../Sheet';
import {EquipmentName} from '../../../EquipmentName';
import {Club} from './Club';
import {Dagger} from './Dagger';
import {type SimpleWeaponName} from './SimpleWeaponName';

export class SimpleWeaponFactory {
	static	makeFromSerialized(serialized: SerializedSheetEquipment<SimpleWeaponName>): SimpleWeapon {
		if (serialized.name === EquipmentName.dagger) {
			return new Dagger();
		}

		if (serialized.name === EquipmentName.club) {
			return new Club();
		}

		throw new SheetBuilderError('UNKNOWN_SIMPLE_WEAPON');
	}
}
