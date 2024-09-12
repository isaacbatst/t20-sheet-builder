import type {Proficiency} from '../../../Sheet/Proficiency';
import {Equipment} from '../Equipment';
import {type EquipmentData} from '../EquipmentData';
import {type EquipmentName} from '../EquipmentName';

export type WeaponType = 'offensive' | 'defensive' | 'exotic' | 'firearm';

export abstract class Weapon<
	N extends EquipmentName = EquipmentName,
	D extends EquipmentData<N> = EquipmentData<N>,
> extends Equipment<N, D> {
	constructor(
		name: N,
		readonly proficiency: Proficiency,
		readonly type: WeaponType,
	) {
		super(name);
	}
}
