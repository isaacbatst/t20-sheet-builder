import type {AbilityDuration} from '../Ability/ActiveAbility';
import type {Translatable} from '../Translator';
import {Modifier} from './Modifier';

export class TemporaryModifier extends Modifier {
	constructor(source: Translatable, value: number, readonly duration: AbilityDuration) {
		super(source, value);
	}
}
