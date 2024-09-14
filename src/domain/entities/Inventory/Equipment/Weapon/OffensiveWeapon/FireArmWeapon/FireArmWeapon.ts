import {Proficiency} from '../../../../../Sheet/Proficiency';
import {OffensiveWeapon} from '../OffensiveWeapon';
import {type FireArmWeaponName} from './FireArmWeaponName';

export class FireArmWeapon<
	N extends FireArmWeaponName = FireArmWeaponName,
> extends OffensiveWeapon<N> {
	constructor(name: N) {
		super(name, Proficiency.fire);
	}
}
