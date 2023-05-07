import {type Static} from '../../../Static';
import {type GeneralPowerName} from '../GeneralPowerName';
import {type TormentaPower} from './TormentaPower';

export type TormentaPowerStatic = Static<TormentaPower, {
	powerName: GeneralPowerName;
}>;
