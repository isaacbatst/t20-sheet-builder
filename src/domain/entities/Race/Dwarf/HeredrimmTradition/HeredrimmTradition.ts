import {AbilityEffects} from '../../../Ability';
import {RaceAbility} from '../../RaceAbility';
import {RaceAbilityName} from '../../RaceAbilityName';
import {HeredrimmTraditionEffect} from './HeredrimmTraditionEffect';

export class HeredrimmTradition extends RaceAbility {
	override effects = new AbilityEffects({
		passive: {
			default: new HeredrimmTraditionEffect(),
		},
	});

	constructor() {
		super(RaceAbilityName.heredrimmTradition);
	}
}
