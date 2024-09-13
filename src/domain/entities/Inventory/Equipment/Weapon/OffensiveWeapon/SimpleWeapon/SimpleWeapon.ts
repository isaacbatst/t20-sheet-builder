import {Proficiency} from '../../../../../Sheet/Proficiency';
import {OffensiveWeapon} from '../OffensiveWeapon';
import {type SimpleWeaponName} from './SimpleWeaponName';

export class SimpleWeapon<
	N extends SimpleWeaponName = SimpleWeaponName,
> extends OffensiveWeapon<N> {
	constructor(
		name: N,
	) {
		super(name, Proficiency.simple);
	}
}
