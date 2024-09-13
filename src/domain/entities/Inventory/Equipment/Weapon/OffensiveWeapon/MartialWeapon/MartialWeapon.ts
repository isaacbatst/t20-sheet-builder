import {Proficiency} from '../../../../../Sheet/Proficiency';
import {OffensiveWeapon} from '../OffensiveWeapon';
import {type MartialWeaponName} from './MartialWeaponName';

export class MartialWeapon<
	N extends MartialWeaponName = MartialWeaponName,
> extends OffensiveWeapon<N> {
	constructor(
		name: N,
	) {
		super(name, Proficiency.martial);
	}
}
