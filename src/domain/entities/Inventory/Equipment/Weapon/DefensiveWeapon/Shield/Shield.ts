import {Proficiency} from '../../../../../Sheet/Proficiency';
import {DefensiveWeapon} from '../DefensiveWeapon';

export abstract class Shield extends DefensiveWeapon {
	get isWieldable(): boolean {
		return true;
	}

	constructor() {
		super(Proficiency.shield);
	}
}
