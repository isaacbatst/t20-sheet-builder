import {type SerializedSheetEquipment} from '../../../../../Sheet';
import {SimpleWeapon} from './SimpleWeapon';
import {type SimpleWeaponName} from './SimpleWeaponName';

export class SimpleWeaponFactory {
	static	makeFromSerialized(serialized: SerializedSheetEquipment<SimpleWeaponName>): SimpleWeapon {
		return new SimpleWeapon(serialized.name);
	}

	static make<N extends SimpleWeaponName>(name: N): SimpleWeapon<N> {
		return new SimpleWeapon(name);
	}
}
