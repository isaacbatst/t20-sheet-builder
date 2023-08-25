import type {Proficiency} from '../../../Sheet/Proficiency';
import {Equipment} from '../Equipment';
import {type EquipmentName} from '../EquipmentName';

export type WeaponType = 'offensive' | 'defensive' | 'exotic' | 'firearm';

export abstract class Weapon<T extends EquipmentName = EquipmentName> extends Equipment<T> {
	abstract readonly type: WeaponType;

	constructor(
		readonly proficiency: Proficiency,
	) {
		super();
	}
}
