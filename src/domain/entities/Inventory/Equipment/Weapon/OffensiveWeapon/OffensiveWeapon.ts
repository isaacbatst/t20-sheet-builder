import type {DiceRoll} from '../../../../Dice/DiceRoll';
import type {WeaponType} from '../Weapon';
import {Weapon} from '../Weapon';
import type {Critical} from '../../../../Attack/Critical';
import {type WeaponPurpose} from '../WeaponPurpose';
import {type EquipmentName} from '../../EquipmentName';
import {EquipmentImprovementCategory} from '../../EquipmentImprovement/EquipmentImprovementCategory';

export abstract class OffensiveWeapon<T extends EquipmentName = EquipmentName> extends Weapon<T> {
	override readonly categoryForImprovement: EquipmentImprovementCategory = EquipmentImprovementCategory.weapon;
	abstract readonly damage: DiceRoll;
	abstract readonly critical: Critical;
	abstract readonly purposes: WeaponPurpose[];

	get isWieldable(): boolean {
		return true;
	}

	get type(): WeaponType {
		return 'offensive';
	}
}
