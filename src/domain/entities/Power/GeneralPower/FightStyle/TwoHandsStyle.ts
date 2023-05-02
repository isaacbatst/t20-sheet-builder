import {AbilityEffects} from '../../../Ability/AbilityEffects';
import {GeneralPower} from '../GeneralPower';
import {GeneralPowerName} from '../GeneralPowerName';

export class TwoHandsStyle extends GeneralPower {
	effects = new AbilityEffects({});
	constructor() {
		super(
			GeneralPowerName.twoHandsStyle,
		);
	}
}
