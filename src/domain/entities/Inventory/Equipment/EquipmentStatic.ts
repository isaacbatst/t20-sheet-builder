import {type Static} from '../../Static';
import {type Equipment} from './Equipment';
import {type EquipmentName} from './EquipmentName';

export type EquipamentStatic<
	N extends EquipmentName = EquipmentName,
	E extends Equipment<N> = Equipment<N>,
	D extends Record<string, unknown> = Record<string, unknown>,
> = Static<E, {
	readonly name: N;
	readonly price: number;
}> & D;
