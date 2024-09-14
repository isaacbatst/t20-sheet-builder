import {type SerializedSheetEquipment} from '../../../../../Sheet';
import {ExoticWeapon} from './ExoticWeapon';
import {type ExoticWeaponName} from './ExoticWeaponName';
export class ExoticWeaponFactory {
	static	makeFromSerialized(serialized: SerializedSheetEquipment<ExoticWeaponName>): ExoticWeapon {
		return new ExoticWeapon(serialized.name);
	}

	static make<N extends ExoticWeaponName>(name: N): ExoticWeapon<N> {
		return new ExoticWeapon(name);
	}
}
