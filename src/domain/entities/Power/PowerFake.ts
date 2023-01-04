import type {AbilityType} from '../Ability/Ability';
import {AbilityEffects} from '../Ability/AbilityEffects';
import type {GeneralPowerInterface} from './GeneralPower/GeneralPower';
import {GeneralPowerName} from './GeneralPower/GeneralPowerName';
import type {PowerInterface, PowerType} from './Power';
import type {RolePowerInterface} from '../Role/RolePower';
import {RolePowerName} from '../Role/RolePowerName';

export class PowerFake implements PowerInterface {
	powerType: PowerType = 'general';
	name: GeneralPowerName = GeneralPowerName.dodge;
	abilityType: AbilityType = 'power';
	addToSheet = jest.fn();
	effects = new AbilityEffects({});
}

export class GeneralPowerFake implements GeneralPowerInterface {
	powerType: PowerType = 'general';
	name: GeneralPowerName = GeneralPowerName.dodge;
	abilityType: AbilityType = 'power';
	addToSheet = jest.fn();
	effects = new AbilityEffects({});
}

export class RolePowerFake implements RolePowerInterface {
	powerType: PowerType = 'role';
	name: RolePowerName = RolePowerName.archer;
	abilityType: AbilityType = 'power';
	addToSheet = jest.fn();
	effects = new AbilityEffects({});
}
