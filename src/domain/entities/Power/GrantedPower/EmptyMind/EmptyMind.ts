import {AbilityEffects} from '../../../Ability';
import {GrantedPower} from '../GrantedPower';
import {GrantedPowerName} from '../GrantedPowerName';
import {EmptyMindEffect} from './EmptyMindEffect';

export class EmptyMind extends GrantedPower {
	override effects = new AbilityEffects({
		passive: {
			default: new EmptyMindEffect(),
		},
	});

	constructor() {
		super(GrantedPowerName.emptyMind);
	}
}