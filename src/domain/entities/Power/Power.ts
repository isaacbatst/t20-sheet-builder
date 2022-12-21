import type {AbilityEffectType, AbilityInterface} from '../Ability';
import {Ability} from '../Ability';
import type {PowerName} from './PowerName';

export type PowerType = 'general' | 'class';

export type PowerInterface = AbilityInterface & {
	name: PowerName;
	powerType: PowerType;
};

export abstract class Power extends Ability implements PowerInterface {
	readonly powerType: PowerType;

	constructor(readonly name: PowerName, effectType: AbilityEffectType, powerType: PowerType) {
		super(name, effectType);
		this.powerType = powerType;
	}
}
