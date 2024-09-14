import {type SerializedSheetEquipment} from '../../../../../Sheet';
import {FireArmWeapon} from './FireArmWeapon';
import {type FireArmWeaponName} from './FireArmWeaponName';
export class FireArmWeaponFactory {
	static	makeFromSerialized(serialized: SerializedSheetEquipment<FireArmWeaponName>): FireArmWeapon {
		return new FireArmWeapon(serialized.name);
	}

	static make<N extends FireArmWeaponName>(name: N): FireArmWeapon<N> {
		return new FireArmWeapon(name);
	}
}
