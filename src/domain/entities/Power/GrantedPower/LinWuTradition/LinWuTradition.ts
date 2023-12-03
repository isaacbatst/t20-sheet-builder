import {AbilityEffects} from '../../../Ability';
import {AbilityEffectsStatic} from '../../../Ability/AbilityEffectsStatic';
import {GrantedPower} from '../GrantedPower';
import {GrantedPowerName} from '../GrantedPowerName';
import {LinWuTraditionEffect} from './LinWuTraditionEffect';

export class LiWuTradition extends GrantedPower {
	static readonly powerName = GrantedPowerName.linWuTradition;

	static readonly effects = new AbilityEffectsStatic({
		roleplay: {
			default: LinWuTraditionEffect,
		},
	});

	override effects = new AbilityEffects({
		roleplay: {
			default: new LinWuTraditionEffect(),
		},
	});

	constructor() {
		super(GrantedPowerName.linWuTradition);
	}
}
