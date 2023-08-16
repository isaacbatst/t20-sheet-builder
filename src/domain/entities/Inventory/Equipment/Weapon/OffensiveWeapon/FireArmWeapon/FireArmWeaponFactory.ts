import {SheetBuilderError} from '../../../../../../errors';
import {type SerializedSheetEquipment} from '../../../../../Sheet';
import {EquipmentName} from '../../../EquipmentName';
import {type FireArmWeapon} from './FireArmWeapon';
import {type FireArmWeaponName} from './FireArmWeaponName';
import {Musket} from './Musket';
import {Pistol} from './Pistol';
export class FireArmWeaponFactory {
	static	makeFromSerialized(serialized: SerializedSheetEquipment<FireArmWeaponName>): FireArmWeapon {
		switch (serialized.name) {
			case EquipmentName.pistol:
				return new Pistol();
			case EquipmentName.musket:
				return new Musket();
			default:
				throw new SheetBuilderError('UNKNOWN_FIREARM_WEAPON');
		}
	}
}
