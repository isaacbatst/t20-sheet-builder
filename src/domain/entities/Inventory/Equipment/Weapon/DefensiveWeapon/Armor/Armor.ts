import type {Proficiency} from '../../../../../Sheet/Proficiency';
import {DefensiveWeapon} from '../DefensiveWeapon';
import {type ArmorName} from './ArmorName';

export abstract class Armor<T extends ArmorName = ArmorName> extends DefensiveWeapon<T> {
	get isWieldable(): boolean {
		return false;
	}

	constructor(override readonly proficiency: Proficiency.lightArmor | Proficiency.heavyArmor) {
		super(proficiency);
	}
}
