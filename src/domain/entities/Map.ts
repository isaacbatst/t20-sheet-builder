import type {GeneralPowerInterface} from './Power/GeneralPower';
import type {GeneralPowerName} from './Power/GeneralPowerName';
import type {RaceAbilityInterface} from './RaceAbility/RaceAbility';
import type {RaceAbilityName} from './RaceAbility/RaceAbilityName';
import type {RoleAbilityInterface} from './Role/RoleAbility';
import type {RoleAbilityName} from './Role/RoleAbilityName';
import type {RolePowerInterface} from './Role/RolePower';
import type {RolePowerName} from './Role/RolePowerName';

export type GeneralPowerMap = Map<GeneralPowerName, GeneralPowerInterface>;
export type RolePowerMap = Map<RolePowerName, RolePowerInterface>;
export type RaceAbilityMap = Map<RaceAbilityName, RaceAbilityInterface>;
export type RoleAbilityMap = Map<RoleAbilityName, RoleAbilityInterface>;
