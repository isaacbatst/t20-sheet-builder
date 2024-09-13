import {type SerializedSheetEquipment} from '../../../../../Sheet';
import {ExoticWeapon} from './ExoticWeapon';
import {type ExoticWeaponName} from './ExoticWeaponName';
export class ExoticWeaponFactory {
	static	makeFromSerialized(serialized: SerializedSheetEquipment<ExoticWeaponName>): ExoticWeapon {
		return new ExoticWeapon(serialized.name);
	}
}
