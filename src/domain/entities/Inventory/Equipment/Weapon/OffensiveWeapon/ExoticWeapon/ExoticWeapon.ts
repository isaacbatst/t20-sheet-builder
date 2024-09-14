import {Proficiency} from '../../../../../Sheet/Proficiency';
import {OffensiveWeapon} from '../OffensiveWeapon';
import {type ExoticWeaponName} from './ExoticWeaponName';

export class ExoticWeapon
<N extends ExoticWeaponName = ExoticWeaponName>
	extends OffensiveWeapon<N> {
	constructor(
		name: N,
	) {
		super(name, Proficiency.exotic);
	}
}
