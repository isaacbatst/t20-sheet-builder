import type {AbilityType} from './Ability/Ability';
import type {GeneralPowerInterface} from './Power/GeneralPower';
import {GeneralPowerName} from './Power/GeneralPowerName';
import type {PowerInterface, PowerType} from './Power/Power';
import type {RolePowerInterface} from './Role/RolePower';
import {RolePowerName} from './Role/RolePowerName';

export class PowerFake implements PowerInterface {
	powerType: PowerType = 'general';
	name: GeneralPowerName = GeneralPowerName.dodge;
	abilityType: AbilityType = 'power';
	addToSheet = jest.fn();
	effects = {};
}

export class GeneralPowerFake implements GeneralPowerInterface {
	powerType: PowerType = 'general';
	name: GeneralPowerName = GeneralPowerName.dodge;
	abilityType: AbilityType = 'power';
	addToSheet = jest.fn();
	effects = {};
}

export class RolePowerFake implements RolePowerInterface {
	powerType: PowerType = 'role';
	name: RolePowerName = RolePowerName.archer;
	abilityType: AbilityType = 'power';
	addToSheet = jest.fn();
	effects = {};
}
