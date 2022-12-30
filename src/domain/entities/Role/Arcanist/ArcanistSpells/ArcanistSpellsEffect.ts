import type {Attribute} from '../../../Sheet/Attributes';
import {Level} from '../../../Sheet/Levels';
import type {LearnableSpellType, Spell} from '../../../Spell/Spell';
import {SpellCircle} from '../../../Spell/SpellCircle';
import {RoleAbilityName} from '../../RoleAbilityName';
import type {SpellLearnFrequency} from '../../SpellsAbility';
import {SpellsAbilityEffect} from '../../SpellsAbilityEffect';

export class ArcanistSpellsEffect extends SpellsAbilityEffect {
	spellsLearnFrequency: SpellLearnFrequency;
	spellsAttribute: Attribute;

	circleLearnLevel: Record<SpellCircle, Level> = {
		[SpellCircle.first]: Level.levelOne,
		[SpellCircle.second]: Level.levelTwo,
	};

	spellType: LearnableSpellType = 'arcane';
	constructor(spells: Spell[], learnFrequency: SpellLearnFrequency, attribute: Attribute) {
		super(spells, 3, RoleAbilityName.arcanistSpells);
		this.spellsLearnFrequency = learnFrequency;
		this.spellsAttribute = attribute;
	}
}
