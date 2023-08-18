import {type SerializedSheetEquipment} from '../../../../../Sheet';
import {type MartialWeapon} from './MartialWeapon';
import {type MartialWeaponName} from './MartialWeaponName';
import {MartialWeapons} from './MartialWeapons';

export class MartialWeaponFactory {
	static	makeFromSerialized(serialized: SerializedSheetEquipment<MartialWeaponName>): MartialWeapon {
		return new (MartialWeapons.getByName(serialized.name))();
	}
}
