import {Proficiency} from '../../../../../Sheet/Proficiency';
import {OffensiveWeapon} from '../OffensiveWeapon';

export abstract class MartialWeapon extends OffensiveWeapon {
	constructor() {
		super(Proficiency.martial);
	}
}
