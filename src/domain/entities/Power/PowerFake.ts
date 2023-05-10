import {vi} from 'vitest';
import type {AbilityType} from '../Ability/Ability';
import {AbilityEffects} from '../Ability/AbilityEffects';
import type {RolePowerInterface} from '../Role/RolePower';
import {RolePowerName} from '../Role/RolePowerName';
import type {GeneralPowerInterface} from './GeneralPower/GeneralPower';
import {GeneralPowerName} from './GeneralPower/GeneralPowerName';
import type {PowerInterface, PowerType} from './Power';
import {GeneralPowerGroup} from './GeneralPower';

export class PowerFake implements PowerInterface {
	powerType: PowerType = 'general';
	name: GeneralPowerName = GeneralPowerName.dodge;
	abilityType: AbilityType = 'power';
	addToSheet = vi.fn();
	verifyRequirements = vi.fn();
	effects = new AbilityEffects({});
}

export class GeneralPowerFake implements GeneralPowerInterface {
	group: GeneralPowerGroup = GeneralPowerGroup.combat;
	powerType: PowerType = 'general';
	name: GeneralPowerName = GeneralPowerName.dodge;
	abilityType: AbilityType = 'power';
	addToSheet = vi.fn();
	verifyRequirements = vi.fn();
	effects = new AbilityEffects({});
}

export class RolePowerFake implements RolePowerInterface {
	powerType: PowerType = 'role';
	name: RolePowerName = RolePowerName.archer;
	abilityType: AbilityType = 'power';
	verifyRequirements = vi.fn();
	addToSheet = vi.fn();
	effects = new AbilityEffects({});
}
