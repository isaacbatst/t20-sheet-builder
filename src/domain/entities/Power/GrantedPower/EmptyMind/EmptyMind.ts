import {AbilityEffects} from '../../../Ability';
import {AbilityEffectsStatic} from '../../../Ability/AbilityEffectsStatic';
import {GrantedPower} from '../GrantedPower';
import {GrantedPowerName} from '../GrantedPowerName';
import {EmptyMindEffect} from './EmptyMindEffect';

export class EmptyMind extends GrantedPower {
	static readonly powerName = GrantedPowerName.emptyMind;
	static readonly effects = new AbilityEffectsStatic({
		passive: {
			default: EmptyMindEffect,
		},
	});

	override effects = new AbilityEffects({
		passive: {
			default: new EmptyMindEffect(),
		},
	});

	constructor() {
		super(GrantedPowerName.emptyMind);
	}
}
