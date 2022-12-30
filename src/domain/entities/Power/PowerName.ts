import type {RolePowerName} from '../Role/RolePowerName';
import type {GeneralPowerName} from './GeneralPowerName';
import type {OriginPowerName} from './OriginPower/OriginPowerName';

export type PowerName = GeneralPowerName | RolePowerName | OriginPowerName;
