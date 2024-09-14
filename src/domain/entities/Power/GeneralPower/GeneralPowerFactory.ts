import {Dodge} from './CombatPower/Dodge/Dodge';
import {OneWeaponStyle} from './CombatPower/FightStyle';
import {Command} from './DestinyPower/Command';
import {IronWill} from './DestinyPower/IronWill/IronWill';
import {Medicine} from './DestinyPower/Medicine/Medicine';
import type {GeneralPower} from './GeneralPower';
import type {GeneralPowerName} from './GeneralPowerName';
import {Shell} from './TormentaPower';

type Params = {
	name: GeneralPowerName;
};

export class GeneralPowerFactory {
	static generalPowerClasses: Record<GeneralPowerName, new() => GeneralPower> = {
		dodge: Dodge,
		ironWill: IronWill,
		medicine: Medicine,
		oneWeaponStyle: OneWeaponStyle,
		shell: Shell,
		command: Command,
	};

	static make(params: Params) {
		return new GeneralPowerFactory.generalPowerClasses[params.name]();
	}
}
