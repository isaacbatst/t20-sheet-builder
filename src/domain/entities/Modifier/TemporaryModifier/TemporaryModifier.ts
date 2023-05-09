import type {EffectDuration} from '../../Ability/ActivateableAbilityEffect';
import type {TranslatableName} from '../../Translator';
import {Modifier} from '../Modifier';
import type {TemporaryModifierInterface} from './TemporaryModifierInterface';

export class TemporaryModifier extends Modifier implements TemporaryModifierInterface {
	constructor(source: TranslatableName, value: number, readonly duration: EffectDuration) {
		super(source, value, 'temporary');
	}
}
