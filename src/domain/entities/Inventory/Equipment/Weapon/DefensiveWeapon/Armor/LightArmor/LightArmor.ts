import {Proficiency} from '../../../../../../Sheet/Proficiency';
import {Armor} from '../Armor';
import {type LightArmorName} from './LightArmorName';

export abstract class LightArmor extends Armor<LightArmorName> {
	constructor() {
		super(Proficiency.lightArmor);
	}
}
