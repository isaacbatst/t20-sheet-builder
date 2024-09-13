import {type SerializedSheetEquipment} from '../../../../../Sheet';
import {MartialWeapon} from './MartialWeapon';
import {type MartialWeaponName} from './MartialWeaponName';

export class MartialWeaponFactory {
	static	makeFromSerialized(serialized: SerializedSheetEquipment<MartialWeaponName>): MartialWeapon {
		return new MartialWeapon(serialized.name);
	}
}
