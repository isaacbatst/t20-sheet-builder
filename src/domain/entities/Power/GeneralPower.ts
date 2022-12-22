import type {AbilityEffectType} from '../Ability';
import type {GeneralPowerName} from './GeneralPowerName';
import {Power} from './Power';

export abstract class GeneralPower extends Power {
	constructor(
		name: GeneralPowerName, effectType: AbilityEffectType,
	) {
		super(name, effectType, 'general');
	}
}
