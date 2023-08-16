import {type SimpleWeapon, type Equipment} from '../../..';
import {SheetBuilderError} from '../../../../../../errors';
import {type SerializedSheetEquipment} from '../../../../../Sheet';
import {EquipmentName} from '../../../EquipmentName';
import {Assegai} from './Assegai';
import {Baton} from './Baton';
import {Club} from './Club';
import {Dagger} from './Dagger';
import {LightCrossbow} from './LightCrossbow';
import {Mace} from './Mace';
import {Pike} from './Pike';
import {ShortSword} from './ShortSword';
import {Shortbow} from './Shortbow';
import {type SimpleWeaponName} from './SimpleWeaponName';
import {Sling} from './Sling';
import {Spear} from './Spear';
import {StaffStick} from './Staff';

export class SimpleWeaponFactory {
	static	makeFromSerialized(serialized: SerializedSheetEquipment<SimpleWeaponName>): SimpleWeapon {
		switch (serialized.name) {
			case EquipmentName.dagger:
				return new Dagger();
			case EquipmentName.shortSword:
				return new ShortSword();
			case EquipmentName.club:
				return new Club();
			case EquipmentName.spear:
				return new Spear();
			case EquipmentName.mace:
				return new Mace();
			case EquipmentName.staffStick:
				return new StaffStick();
			case EquipmentName.pike:
				return new Pike();
			case EquipmentName.baton:
				return new Baton();
			case EquipmentName.assegai:
				return new Assegai();
			case EquipmentName.lightCrossbow:
				return new LightCrossbow();
			case EquipmentName.sling:
				return new Sling();
			case EquipmentName.shortbow:
				return new Shortbow();
			default:
				throw new SheetBuilderError('UNKNOWN_SIMPLE_WEAPON');
		}
	}
}
