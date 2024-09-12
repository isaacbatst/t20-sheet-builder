import {EquipmentName} from '../EquipmentName';
import {EquipmentAlchemic} from './EquipmentAlchemic';
import {type EquipmentAlchemicName} from './EquipmentAlchemicName';

export class EquipmentsAlchemic {
	static map: {
		[N in EquipmentAlchemicName]: EquipmentAlchemic<N>;
	} = {
			acid: new EquipmentAlchemic(EquipmentName.acid),
			bomb: new EquipmentAlchemic(EquipmentName.bomb),
			loveElixir: new EquipmentAlchemic(EquipmentName.loveElixir),
		};
}
