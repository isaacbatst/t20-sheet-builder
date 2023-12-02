import {type AbilityEffectsStatic} from '../Ability/AbilityEffectsStatic';
import {type Static} from '../Static';
import {type Power} from './Power';
import {type PowerName} from './PowerName';

export type PowerStatic<
	P extends Power = Power,
	N extends PowerName = P['name'],
> = Static<
P,
{
	powerName: N;
	effects: AbilityEffectsStatic;
}
>;
