import {Proficiency} from '../../../../../Sheet/Proficiency';
import {OffensiveWeapon} from '../OffensiveWeapon';

export abstract class SimpleWeapon extends OffensiveWeapon {
	constructor() {
		super(Proficiency.simple);
	}
}
