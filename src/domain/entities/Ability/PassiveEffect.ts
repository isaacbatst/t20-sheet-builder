import type {AbilityName} from './Ability';
import {AbilityEffect} from './AbilityEffect';

export abstract class PassiveEffect extends AbilityEffect {
	constructor(source: AbilityName) {
		super('passive', source);
	}
}
