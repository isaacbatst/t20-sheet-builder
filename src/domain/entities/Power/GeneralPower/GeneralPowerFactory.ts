import {Dodge} from './Dodge';
import type {GeneralPower} from './GeneralPower';
import type {GeneralPowerName} from './GeneralPowerName';
import {IronWill} from './IronWill';
import {Medicine} from './Medicine';
import {SwordAndShieldStyle} from './FightStyle/SwordAndShieldStyle';
import {TwoHandsStyle} from './FightStyle/TwoHandsStyle';
import {OneWeaponStyle} from './FightStyle/OneWeaponStyle';

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
	};

	static make(params: Params) {
		return new GeneralPowerFactory.generalPowerClasses[params.name]();
	}
}
