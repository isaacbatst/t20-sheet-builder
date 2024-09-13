import {type SerializedSheetEquipment} from '../../../../../Sheet';
import {SimpleWeapon} from './SimpleWeapon';
import {type SimpleWeaponName} from './SimpleWeaponName';

export class SimpleWeaponFactory {
	static	makeFromSerialized(serialized: SerializedSheetEquipment<SimpleWeaponName>): SimpleWeapon {
		return new SimpleWeapon(serialized.name);
	}
}
