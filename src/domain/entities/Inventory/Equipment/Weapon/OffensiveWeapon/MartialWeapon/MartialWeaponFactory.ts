import {type SerializedSheetEquipment} from '../../../../../Sheet';
import {MartialWeapon} from './MartialWeapon';
import {type MartialWeaponName} from './MartialWeaponName';

export class MartialWeaponFactory {
	static	makeFromSerialized(serialized: SerializedSheetEquipment<MartialWeaponName>): MartialWeapon {
		return new MartialWeapon(serialized.name);
	}

	static make<N extends MartialWeaponName>(name: N): MartialWeapon<N> {
		return new MartialWeapon(name);
	}
}
