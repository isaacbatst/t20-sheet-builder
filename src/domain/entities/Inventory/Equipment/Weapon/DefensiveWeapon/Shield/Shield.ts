import {Proficiency} from '../../../../../Sheet/Proficiency';
import {EquipmentImprovementCategory} from '../../../EquipmentImprovement/EquipmentImprovementCategory';
import {DefensiveWeapon} from '../DefensiveWeapon';
import {type ShieldName} from './ShieldName';

export abstract class Shield extends DefensiveWeapon<ShieldName> {
	override readonly categoryForImprovement = EquipmentImprovementCategory.armorAndShield;

	get isWieldable(): boolean {
		return true;
	}

	constructor() {
		super(Proficiency.shield);
	}
}
