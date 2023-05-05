import {Proficiency} from '../../../../../../Sheet/Proficiency';
import {Armor} from '../Armor';

export abstract class HeavyArmor extends Armor {
	constructor() {
		super(Proficiency.heavyArmor);
	}
}
