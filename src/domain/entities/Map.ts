import type {TriggeredEffectInterface} from './Ability/TriggeredEffect';
import type {TriggeredEffectName} from './Ability/TriggeredEffectName';
import type {GeneralPowerInterface} from './Power/GeneralPower/GeneralPower';
import type {GeneralPowerName} from './Power/GeneralPower/GeneralPowerName';
import type {OriginPowerInterface} from './Power/OriginPower/OriginPower';
import type {OriginPowerName} from './Power/OriginPower/OriginPowerName';
import type {RaceAbilityInterface} from './Race/RaceAbility';
import type {RaceAbilityName} from './Race/RaceAbilityName';
import type {RoleAbilityInterface} from './Role/RoleAbility';
import type {RoleAbilityName} from './Role/RoleAbilityName';
import type {RolePowerInterface} from './Role/RolePower';
import type {RolePowerName} from './Role/RolePowerName';

export type GeneralPowerMap = Map<GeneralPowerName, GeneralPowerInterface>;
export type RolePowerMap = Map<RolePowerName, RolePowerInterface>;
export type OriginPowerMap = Map<OriginPowerName, OriginPowerInterface>;
export type RaceAbilityMap = Map<RaceAbilityName, RaceAbilityInterface>;
export type RoleAbilityMap = Map<RoleAbilityName, RoleAbilityInterface>;
export type TriggeredEffectMap = Map<TriggeredEffectName, TriggeredEffectInterface>;
