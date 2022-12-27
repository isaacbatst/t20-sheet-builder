import type {EffectDuration} from '../../Ability/ActivateableAbilityEffect';
import type {ModifierInterface} from '../ModifierInterface';

export type TemporaryModifierInterface = ModifierInterface & {
	duration: EffectDuration;
};
