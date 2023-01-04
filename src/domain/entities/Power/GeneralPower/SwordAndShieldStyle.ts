import {AbilityEffects} from '../../Ability/AbilityEffects';
import {GeneralPower} from './GeneralPower';
import {GeneralPowerName} from './GeneralPowerName';

export class SwordAndShieldStyle extends GeneralPower {
	effects = new AbilityEffects({});
	constructor() {
		super(
			GeneralPowerName.swordAndShieldStyle,
		);
	}
}
