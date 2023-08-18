import {type SerializedSheetEquipment} from '../../../../../Sheet';
import {type SimpleWeapon} from './SimpleWeapon';
import {type SimpleWeaponName} from './SimpleWeaponName';
import {SimpleWeapons} from './SimpleWeapons';

export class SimpleWeaponFactory {
	static	makeFromSerialized(serialized: SerializedSheetEquipment<SimpleWeaponName>): SimpleWeapon {
		return new (SimpleWeapons.getByName(serialized.name))();
	}
}
