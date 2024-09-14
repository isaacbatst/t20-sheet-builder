import type {Proficiency} from '../../../Sheet/Proficiency';
import {Equipment} from '../Equipment';
import {type EquipmentData} from '../EquipmentData';
import {type EquipmentName} from '../EquipmentName';

export abstract class Weapon<
	N extends EquipmentName = EquipmentName,
	D extends EquipmentData<N> = EquipmentData<N>,
> extends Equipment<N, D> {
	constructor(
		name: N,
		readonly proficiency: Proficiency,
	) {
		super(name);
	}
}
