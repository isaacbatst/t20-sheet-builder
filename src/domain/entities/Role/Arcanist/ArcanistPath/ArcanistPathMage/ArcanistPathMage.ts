import {AbilityEffects, type AbilityEffectsInterface} from '../../../../Ability/AbilityEffects';
import type {Attribute} from '../../../../Sheet';
import type {Spell} from '../../../../Spell/Spell';
import type {SpellLearnFrequency} from '../../../SpellsAbility';
import {ArcanistPath, ArcanistPathName} from '../ArcanistPath';
import {ArcanistPathMageExtraSpellEffect} from './ArcanistPathMageExtraSpellEffect';

export class ArcanistPathMage extends ArcanistPath {
	effects: AbilityEffectsInterface & {passive: {extraSpell: ArcanistPathMageExtraSpellEffect}};
	spellsAttribute: Attribute = 'intelligence';
	spellLearnFrequency: SpellLearnFrequency = 'all';
	readonly pathName = ArcanistPathName.mage;

	constructor(additionalSpell: Spell) {
		super();
		this.effects = new AbilityEffects({
			passive: {
				extraSpell: new ArcanistPathMageExtraSpellEffect(additionalSpell),
			},
		});
	}

	getExtraSpell(): Spell {
		return this.effects.passive.extraSpell.spell;
	}
}
