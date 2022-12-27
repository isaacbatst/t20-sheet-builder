import type {EffectDuration} from '../../Ability/ActivateableAbilityEffect';
import type {Translatable} from '../../Translator';
import {Modifier} from '../Modifier';
import type {TemporaryModifierInterface} from './TemporaryModifierInterface';

export class TemporaryModifier extends Modifier implements TemporaryModifierInterface {
	constructor(source: Translatable, value: number, readonly duration: EffectDuration) {
		super(source, value, 'temporary');
	}
}
