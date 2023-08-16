import type {Proficiency} from '../../../Sheet/Proficiency';
import {Equipment} from '../Equipment';

export type WeaponType = 'offensive' | 'defensive' | 'exotic' | 'firearm';

export abstract class Weapon extends Equipment {
	abstract readonly type: WeaponType;

	constructor(
		readonly proficiency: Proficiency,
	) {
		super();
	}
}
