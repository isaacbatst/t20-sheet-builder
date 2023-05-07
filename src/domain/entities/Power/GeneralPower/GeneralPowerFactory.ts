import {Dodge} from './CombatPower/Dodge/Dodge';
import {OneWeaponStyle} from './CombatPower/FightStyle';
import {SwordAndShieldStyle} from './CombatPower/FightStyle/SwordAndShieldStyle';
import {TwoHandsStyle} from './CombatPower/FightStyle/TwoHandsStyle';
import type {GeneralPower} from './GeneralPower';
import type {GeneralPowerName} from './GeneralPowerName';
import {IronWill} from './DestinyPower/IronWill/IronWill';
import {Medicine} from './DestinyPower/Medicine/Medicine';
import {Shell} from './TormentaPower';

type Params = {
	name: GeneralPowerName;
};

export class GeneralPowerFactory {
	static generalPowerClasses: Record<GeneralPowerName, new() => GeneralPower> = {
		dodge: Dodge,
		ironWill: IronWill,
		medicine: Medicine,
		swordAndShieldStyle: SwordAndShieldStyle,
		twoHandsStyle: TwoHandsStyle,
		oneWeaponStyle: OneWeaponStyle,
		shell: Shell,
	};

	static make(params: Params) {
		return new GeneralPowerFactory.generalPowerClasses[params.name]();
	}
}
