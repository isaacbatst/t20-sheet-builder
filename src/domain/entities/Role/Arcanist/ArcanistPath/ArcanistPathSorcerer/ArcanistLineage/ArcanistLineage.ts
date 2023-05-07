import {type AbilityEffectsInterface} from '../../../../../Ability/AbilityEffects';
import {type AbilityLevel} from '../../../../../Ability/AbilityLevel';
import {type ArcanistLineageType} from './ArcanistLineageType';

export abstract class ArcanistLineage {
	abstract effects: Record<AbilityLevel, AbilityEffectsInterface>;
	abstract type: ArcanistLineageType;
}
