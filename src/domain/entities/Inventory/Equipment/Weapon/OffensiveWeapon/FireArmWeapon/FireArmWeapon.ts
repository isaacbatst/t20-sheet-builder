import {Proficiency} from '../../../../../Sheet/Proficiency';
import {OffensiveWeapon} from '../OffensiveWeapon';
import {type FireArmWeaponName} from './FireArmWeaponName';

export abstract class FireArmWeapon extends OffensiveWeapon {
	abstract override name: FireArmWeaponName;

	constructor() {
		super(Proficiency.fire);
	}
}
