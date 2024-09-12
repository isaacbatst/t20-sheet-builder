import {Proficiency} from '../../../../../Sheet/Proficiency';
import {OffensiveWeapon} from '../OffensiveWeapon';
import {type ExoticWeaponName} from './ExoticWeaponName';

export abstract class ExoticWeapon
<N extends ExoticWeaponName = ExoticWeaponName>
	extends OffensiveWeapon<N> {
	abstract override name: N;

	constructor() {
		super(Proficiency.exotic);
	}
}
