import {Dodge, OneWeaponStyle} from './CombatPower';
import {IronWill, Medicine} from './DestinyPower';
import {type GeneralPowerName} from './GeneralPowerName';
import {type GeneralPowerStatic} from './GeneralPowerStatic';
import {Shell} from './TormentaPower/Shell/Shell';

export class GeneralPowers {
	static readonly map: Record<GeneralPowerName, GeneralPowerStatic> = {
		dodge: Dodge,
		ironWill: IronWill,
		medicine: Medicine,
		oneWeaponStyle: OneWeaponStyle,
		shell: Shell,
	};
}
