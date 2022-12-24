import type {EffectDuration} from '../Ability/ActivateableAbilityEffect';
import type {Translatable} from '../Translator';
import {Modifier} from './Modifier';

export class TemporaryModifier extends Modifier {
	constructor(source: Translatable, value: number, readonly duration: EffectDuration) {
		super(source, value);
	}
}
