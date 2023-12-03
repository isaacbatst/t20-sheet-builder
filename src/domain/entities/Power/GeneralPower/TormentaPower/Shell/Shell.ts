import {AbilityEffects} from '../../../../Ability/AbilityEffects';
import {AbilityEffectsStatic} from '../../../../Ability/AbilityEffectsStatic';
import {GeneralPowerName} from '../../GeneralPowerName';
import {TormentaPower} from '../TormentaPower';
import {ShellEffect} from './ShellEffect';

export class Shell extends TormentaPower {
	static powerName = GeneralPowerName.shell;
	static effects = new AbilityEffectsStatic({
		passive: {
			default: ShellEffect,
		},
	});

	effects = new AbilityEffects({
		passive: {
			default: new ShellEffect(),
		},
	});

	constructor() {
		super(Shell.powerName);
	}
}
