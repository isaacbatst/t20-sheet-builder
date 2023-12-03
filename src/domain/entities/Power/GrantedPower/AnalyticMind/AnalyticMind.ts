import {AbilityEffects} from '../../../Ability';
import {AbilityEffectsStatic} from '../../../Ability/AbilityEffectsStatic';
import {GrantedPower} from '../GrantedPower';
import {GrantedPowerName} from '../GrantedPowerName';
import {AnalyticMindEffect} from './AnalyticMindEffect';

export class AnalyticMind extends GrantedPower {
	static readonly powerName = GrantedPowerName.analyticMind;
	static readonly effects = new AbilityEffectsStatic({
		passive: {
			default: AnalyticMindEffect,
		},
	});

	override effects = new AbilityEffects({
		passive: {
			default: new AnalyticMindEffect(),
		},
	});

	constructor() {
		super(GrantedPowerName.analyticMind);
	}
}
