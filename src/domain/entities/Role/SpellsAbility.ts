import {RoleAbility} from './RoleAbility';
import type {SpellsAbilityEffect} from './SpellsAbilityEffect';

export type SpellLearnFrequency = 'all' | 'even' | 'odd';

export abstract class SpellsAbility extends RoleAbility {
	abstract override effects: {
		default: SpellsAbilityEffect;
	};
}
