import type {AbilityEffectType} from '../Ability';
import type {GeneralPowerNameEnum} from './GeneralPowerName';
import {Power} from './Power';

export abstract class GeneralPower extends Power {
	constructor(
		name: GeneralPowerNameEnum, effectType: AbilityEffectType,
	) {
		super(name, effectType, 'general');
	}
}
