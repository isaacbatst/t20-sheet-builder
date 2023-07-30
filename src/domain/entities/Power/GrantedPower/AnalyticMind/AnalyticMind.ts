import {AbilityEffects} from '../../../Ability';
import {GrantedPower} from '../GrantedPower';
import {GrantedPowerName} from '../GrantedPowerName';
import {AnalyticMindEffect} from './AnalyticMindEffect';

export class AnalyticMind extends GrantedPower {
	override effects = new AbilityEffects({
		passive: {
			default: new AnalyticMindEffect(),
		},
	});

	constructor() {
		super(GrantedPowerName.analyticMind);
	}
}
