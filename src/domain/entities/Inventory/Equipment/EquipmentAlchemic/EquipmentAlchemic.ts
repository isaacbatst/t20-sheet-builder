import {Equipment} from '../Equipment';
import {type EquipmentAlchemicData} from './EquipmentAlchemicData';
import {type EquipmentAlchemicName} from './EquipmentAlchemicName';

export class EquipmentAlchemic<
	N extends EquipmentAlchemicName = EquipmentAlchemicName,
> extends Equipment<
	N,
	EquipmentAlchemicData<N>
	> {}
