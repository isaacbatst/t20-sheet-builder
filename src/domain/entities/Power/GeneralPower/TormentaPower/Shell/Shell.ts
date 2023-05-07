import {AbilityEffects} from '../../../../Ability/AbilityEffects';
import {GeneralPowerName} from '../../GeneralPowerName';
import {TormentaPower} from '../TormentaPower';
import {ShellEffect} from './ShellEffect';

export class Shell extends TormentaPower {
	static powerName = GeneralPowerName.shell;
	effects = new AbilityEffects({
		passive: {
			default: new ShellEffect(),
		},
	});

	constructor() {
		super(Shell.powerName);
	}
}
