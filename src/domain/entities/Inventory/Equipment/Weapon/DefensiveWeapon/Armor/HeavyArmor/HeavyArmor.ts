import {Proficiency} from '../../../../../../Sheet/Proficiency';
import {Armor} from '../Armor';
import {type HeavyArmorName} from './HeavyArmorName';

export abstract class HeavyArmor extends Armor<HeavyArmorName> {
	constructor() {
		super(Proficiency.heavyArmor);
	}
}
