import type {AbilityEffectType} from './Ability';
import {GeneralPowerNameEnum} from './Power/GeneralPowerName';
import type {PowerInterface, PowerType} from './Power/Power';

export class PowerFake implements PowerInterface {
	name: GeneralPowerNameEnum = GeneralPowerNameEnum.dodge;
	effectType: AbilityEffectType = 'passive';
	powerType: PowerType = 'general';
	apply = jest.fn();
}
