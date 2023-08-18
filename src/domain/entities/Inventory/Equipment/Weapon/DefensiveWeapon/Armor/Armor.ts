import type {Proficiency} from '../../../../../Sheet/Proficiency';
import {DefensiveWeapon} from '../DefensiveWeapon';

export abstract class Armor extends DefensiveWeapon {
	get isWieldable(): boolean {
		return false;
	}

	constructor(override readonly proficiency: Proficiency.lightArmor | Proficiency.heavyArmor) {
		super(proficiency);
	}
}
