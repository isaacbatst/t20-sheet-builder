import {SheetBuilderError} from '../../../../../../errors';
import {type SerializedSheetEquipment} from '../../../../../Sheet';
import {EquipmentName} from '../../../EquipmentName';
import {BastardSword} from './BastardSword';
import {ChainofThorns} from './ChainofThorns';
import {DwarfAxe} from './DwarfAxe';
import {type ExoticWeapon} from './ExoticWeapon';
import {type ExoticWeaponName} from './ExoticWeaponName';
import {Katana} from './Katana';
import {TauricAxe} from './TauricAxe';
import {Whip} from './Whip';
export class ExoticWeaponFactory {
	static	makeFromSerialized(serialized: SerializedSheetEquipment<ExoticWeaponName>): ExoticWeapon {
		switch (serialized.name) {
			case EquipmentName.whip:
				return new Whip();
			case EquipmentName.bastardSword:
				return new BastardSword();
			case EquipmentName.katana:
				return new Katana();
			case EquipmentName.dwarfAxe:
				return new DwarfAxe();
			case EquipmentName.chainofThorns:
				return new ChainofThorns();
			case EquipmentName.tauricAxe:
				return new TauricAxe();
			default:
				throw new SheetBuilderError('UNKNOWN_EXOTIC_WEAPON');
		}
	}
}
