import type {AbilityEffectType, AbilityInterface} from '../Ability';
import {Ability} from '../Ability';
import type {PowerNameEnum} from './PowerName';

export type PowerType = 'general' | 'class';

export type PowerInterface = AbilityInterface & {
	name: PowerNameEnum;
	powerType: PowerType;
};

export abstract class Power extends Ability implements PowerInterface {
	readonly powerType: PowerType;

	constructor(readonly name: PowerNameEnum, effectType: AbilityEffectType, powerType: PowerType) {
		super(name, effectType);
		this.powerType = powerType;
	}
}
