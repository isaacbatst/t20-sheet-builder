import {AbilityEffects} from '../../../Ability';
import {GrantedPower} from '../GrantedPower';
import {GrantedPowerName} from '../GrantedPowerName';

export class LiWuTradition extends GrantedPower {
	override effects = new AbilityEffects();

	constructor() {
		super(GrantedPowerName.linWuTradition);
	}
}
