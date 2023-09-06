import type {Proficiency} from '../../../../../Sheet/Proficiency';
import {EquipmentImprovementCategory} from '../../../EquipmentImprovement/EquipmentImprovementCategory';
import {DefensiveWeapon} from '../DefensiveWeapon';
import {type ArmorName} from './ArmorName';

export abstract class Armor<T extends ArmorName = ArmorName> extends DefensiveWeapon<T> {
	override readonly categoryForImprovement: EquipmentImprovementCategory = EquipmentImprovementCategory.armorAndShield;

	get isWieldable(): boolean {
		return false;
	}

	constructor(override readonly proficiency: Proficiency.lightArmor | Proficiency.heavyArmor) {
		super(proficiency);
	}
}
