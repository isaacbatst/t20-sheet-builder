import type {RolePowerName} from '../Role/RolePowerName';
import type {GeneralPowerName} from './GeneralPower/GeneralPowerName';
import {type GrantedPowerName} from './GrantedPower/GrantedPowerName';
import type {OriginPowerName} from './OriginPower/OriginPowerName';

export type PowerName = GeneralPowerName | RolePowerName | OriginPowerName | GrantedPowerName;
