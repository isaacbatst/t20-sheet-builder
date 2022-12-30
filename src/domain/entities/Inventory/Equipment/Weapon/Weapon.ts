import type {Proficiency} from '../../../Sheet/Proficiency';
import {Equipment} from '../Equipment';
import type {EquipmentName} from '../EquipmentName';

export type WeaponType = 'offensive' | 'defensive';

export class Weapon extends Equipment {
	constructor(
		name: EquipmentName,
		readonly proficiency: Proficiency,
		readonly type: WeaponType,
	) {
		super(name);
	}
}
