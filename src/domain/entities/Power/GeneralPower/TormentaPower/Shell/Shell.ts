import {AbilityEffects} from '../../../../Ability/AbilityEffects';
import {GeneralPowerName} from '../../GeneralPowerName';
import {TormentaPower} from '../TormentaPower';
import {ShellEffect} from './ShellEffect';

export class Shell extends TormentaPower {
	effects = new AbilityEffects({
		passive: {
			default: new ShellEffect(),
		},
	});

	constructor() {
		super(GeneralPowerName.shell);
	}
}
