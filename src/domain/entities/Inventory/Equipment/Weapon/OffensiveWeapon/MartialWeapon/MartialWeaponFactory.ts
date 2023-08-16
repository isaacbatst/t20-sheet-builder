import {SheetBuilderError} from '../../../../../../errors';
import {type SerializedSheetEquipment} from '../../../../../Sheet';
import {EquipmentName} from '../../../EquipmentName';
import {BattleAxe} from './BattleAxe';
import {Cutlass} from './Cutlass';
import {Flail} from './Flail';
import {Foil} from './Foil';
import {Halberd} from './Halberd';
import {LongSword} from './LongSword';
import {type MartialWeapon} from './MartialWeapon';
import {type MartialWeaponName} from './MartialWeaponName';
import {MountedSpear} from './MountedSpear';
import {Pickaxe} from './Pickaxe';
import {Scimitar} from './Scimitar';
import {Scythe} from './Scythe';
import {Trident} from './Trident';
import {WarHammer} from './WarHammer';
import {WarAxe} from './WarAxe';
import {HandAndaHalfSword} from './HandAndAHalfSword';
import {LongBow} from './LongBow';
import {HeavyCrossbow} from './HeavyCrossbow';

export class MartialWeaponFactory {
	static	makeFromSerialized(serialized: SerializedSheetEquipment<MartialWeaponName>): MartialWeapon {
		switch (serialized.name) {
			case EquipmentName.longSword:
				return new LongSword();
			case EquipmentName.scythe:
				return new Scythe();
			case EquipmentName.foil:
				return new Foil();
			case EquipmentName.battleAxe:
				return new BattleAxe();
			case EquipmentName.flail:
				return new Flail();
			case EquipmentName.warHammer:
				return new WarHammer();
			case EquipmentName.pickaxe:
				return new Pickaxe();
			case EquipmentName.trident:
				return new Trident();
			case EquipmentName.halberd:
				return new Halberd();
			case EquipmentName.cutlass:
				return new Cutlass();
			case EquipmentName.scimitar:
				return new Scimitar();
			case EquipmentName.mountedSpear:
				return new MountedSpear();
			case EquipmentName.warAxe:
				return new WarAxe();
			case EquipmentName.handAndaHalfSword:
				return new HandAndaHalfSword();
			case EquipmentName.longBow:
				return new LongBow();
			case EquipmentName.heavyCrossbow:
				return new HeavyCrossbow();
			default:
				throw new SheetBuilderError('UNKNOWN_MARTIAL_WEAPON');
		}
	}
}
