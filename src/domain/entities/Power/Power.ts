import type {AbilityEffectType} from '../Ability';
import {Ability} from '../Ability';
import type {PowerNameEnum} from './PowerName';

export type PowerType = 'general' | 'class';

export abstract class Power extends Ability {
	readonly powerType: PowerType;

	constructor(name: PowerNameEnum, effectType: AbilityEffectType, powerType: PowerType) {
		super(name, effectType);
		this.powerType = powerType;
	}
}
