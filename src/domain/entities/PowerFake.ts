import type {AbilityEffectType} from './Ability/Ability';
import type {GeneralPowerInterface} from './Power/GeneralPower';
import {GeneralPowerName} from './Power/GeneralPowerName';
import type {PowerInterface, PowerType} from './Power/Power';
import type {RolePowerInterface} from './Role/RolePower';
import {RolePowerName} from './Role/RolePowerName';

export class PowerFake implements PowerInterface {
	name: GeneralPowerName = GeneralPowerName.dodge;
	effectType: AbilityEffectType = 'passive';
	type: PowerType = 'general';
	addToSheet = jest.fn();
}

export class GeneralPowerFake implements GeneralPowerInterface {
	name: GeneralPowerName = GeneralPowerName.dodge;
	effectType: AbilityEffectType = 'passive';
	addToSheet = jest.fn();
	type: PowerType = 'general';
}

export class RolePowerFake implements RolePowerInterface {
	name: RolePowerName = RolePowerName.archer;
	effectType: AbilityEffectType = 'passive';
	addToSheet = jest.fn();
	type: PowerType = 'role';
}
