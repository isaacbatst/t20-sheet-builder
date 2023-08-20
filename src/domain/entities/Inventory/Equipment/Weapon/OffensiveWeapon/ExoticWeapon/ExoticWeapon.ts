import {Proficiency} from '../../../../../Sheet/Proficiency';
import {OffensiveWeapon} from '../OffensiveWeapon';
import {type ExoticWeaponName} from './ExoticWeaponName';

export abstract class ExoticWeapon extends OffensiveWeapon {
	abstract override name: ExoticWeaponName;

	constructor() {
		super(Proficiency.exotic);
	}
}
