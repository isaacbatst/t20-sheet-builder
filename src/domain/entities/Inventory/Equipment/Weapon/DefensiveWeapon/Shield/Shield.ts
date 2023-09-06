import {Proficiency} from '../../../../../Sheet/Proficiency';
import {EquipmentImprovementCategory} from '../../../EquipmentImprovement/EquipmentImprovementCategory';
import {DefensiveWeapon} from '../DefensiveWeapon';

export abstract class Shield extends DefensiveWeapon {
	override readonly categoryForImprovement = EquipmentImprovementCategory.armorAndShield;

	get isWieldable(): boolean {
		return true;
	}

	constructor() {
		super(Proficiency.shield);
	}
}
