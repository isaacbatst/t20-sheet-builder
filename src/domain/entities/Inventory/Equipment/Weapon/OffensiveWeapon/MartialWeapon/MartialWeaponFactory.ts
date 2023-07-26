import {SheetBuilderError} from '../../../../../../errors';
import {type SerializedSheetEquipment} from '../../../../../Sheet';
import {EquipmentName} from '../../../EquipmentName';
import {LongSword} from './LongSword';
import {type MartialWeapon} from './MartialWeapon';
import {type MartialWeaponName} from './MartialWeaponName';
import {Scythe} from './Scythe';

export class MartialWeaponFactory {
	static	makeFromSerialized(serialized: SerializedSheetEquipment<MartialWeaponName>): MartialWeapon {
		if (serialized.name === EquipmentName.longSword) {
			return new LongSword();
		}

		if (serialized.name === EquipmentName.scythe) {
			return new Scythe();
		}

		throw new SheetBuilderError('UNKNOWN_MARTIAL_WEAPON');
	}
}
