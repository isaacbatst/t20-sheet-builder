import {Proficiency} from '../../../../../Sheet/Proficiency';
import {WeaponPurposeRangedShooting} from '../../WeaponPurpose';
import {OffensiveWeapon} from '../OffensiveWeapon';
import {type FireArmWeaponName} from './FireArmWeaponName';

export abstract class FireArmWeapon extends OffensiveWeapon<FireArmWeaponName> {
	static purposes = [
		new WeaponPurposeRangedShooting(),
	];

	readonly purposes = FireArmWeapon.purposes;
	abstract override name: FireArmWeaponName;

	constructor() {
		super(Proficiency.fire);
	}
}
