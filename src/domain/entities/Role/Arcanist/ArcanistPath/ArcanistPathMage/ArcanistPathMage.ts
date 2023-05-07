import {AbilityEffects, type AbilityEffectsInterface} from '../../../../Ability/AbilityEffects';
import type {Attribute} from '../../../../Sheet';
import type {Spell} from '../../../../Spell/Spell';
import type {SpellLearnFrequency} from '../../../SpellsAbility';
import {ArcanistPath, ArcanistPathName} from '../ArcanistPath';
import {ArcanistPathMageExtraSpellEffect} from './ArcanistPathMageExtraSpellEffect';

export class ArcanistPathMage extends ArcanistPath {
	override effects: AbilityEffectsInterface;
	spellsAttribute: Attribute = 'intelligence';
	spellLearnFrequency: SpellLearnFrequency = 'all';
	override pathName: ArcanistPathName = ArcanistPathName.mage;

	constructor(readonly additionalSpell: Spell) {
		super();
		this.effects = new AbilityEffects({
			passive: {
				extraSpell: new ArcanistPathMageExtraSpellEffect(additionalSpell),
			},
		});
	}
}
