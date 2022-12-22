import type {AbilityEffectType} from './Ability/Ability';
import {GeneralPowerName} from './Power/GeneralPowerName';
import type {PowerInterface, PowerType} from './Power/Power';

export class PowerFake implements PowerInterface {
	name: GeneralPowerName = GeneralPowerName.dodge;
	effectType: AbilityEffectType = 'passive';
	powerType: PowerType = 'general';
	apply = jest.fn();
}
