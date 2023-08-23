import type {DiceRoll} from '../../../../Dice/DiceRoll';
import type {WeaponType} from '../Weapon';
import {Weapon} from '../Weapon';
import type {Critical} from '../../../../Attack/Critical';
import {type WeaponPurpose} from '../WeaponPurpose';
import { EquipmentName } from '../../EquipmentName';

export abstract class OffensiveWeapon<T extends EquipmentName = EquipmentName> extends Weapon<T> {
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
