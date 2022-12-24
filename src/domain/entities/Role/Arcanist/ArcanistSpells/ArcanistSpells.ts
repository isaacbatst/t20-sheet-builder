import type {Attribute} from '../../../Attributes';
import type {Spell} from '../../../Spell/Spell';
import {RoleAbilityName} from '../../RoleAbilityName';
import type {SpellLearnFrequency} from '../../SpellsAbility';
import {SpellsAbility} from '../../SpellsAbility';
import {ArcanistSpellsEffect} from './ArcanistSpellsEffect';

export class ArcanistSpells extends SpellsAbility {
	effects: {
		default: ArcanistSpellsEffect;
	};

	constructor(spells: Spell[], learnFrequency: SpellLearnFrequency, attribute: Attribute) {
		super(RoleAbilityName.arcanistSpells);
		this.effects = {
			default: new ArcanistSpellsEffect(spells, learnFrequency, attribute),
		};
	}
}
