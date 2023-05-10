import type {AbilityEffectsInterface} from '../../../Ability/AbilityEffects';
import {AbilityEffects} from '../../../Ability/AbilityEffects';
import type {Attribute} from '../../../Sheet/Attributes';
import type {Spell} from '../../../Spell/Spell';
import {RoleAbilityName} from '../../RoleAbilityName';
import type {SpellLearnFrequency} from '../../SpellsAbility';
import {SpellsAbility} from '../../SpellsAbility';
import {ArcanistSpellsEffect} from './ArcanistSpellsEffect';

export class ArcanistSpells extends SpellsAbility {
	effects: AbilityEffectsInterface & {
		passive: {
			default: ArcanistSpellsEffect;
		};
	};

	constructor(spells: Spell[], learnFrequency: SpellLearnFrequency, attribute: Attribute) {
		super(RoleAbilityName.arcanistSpells);
		this.effects = new AbilityEffects({
			passive: {
				default: new ArcanistSpellsEffect(spells, learnFrequency, attribute),
			},
		});
	}
}
