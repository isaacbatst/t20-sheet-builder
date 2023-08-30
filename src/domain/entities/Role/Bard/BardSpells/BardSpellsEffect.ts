import {Level, type Attributes} from '../../../Sheet';
import {SpellCircle, type LearnableSpellType, type Spell, type SpellSchool} from '../../../Spell';
import {RoleAbilityName} from '../../RoleAbilityName';
import {type SpellLearnFrequency} from '../../SpellsAbility';
import {SpellsAbilityEffect} from '../../SpellsAbilityEffect';

export class BardSpellsEffect extends SpellsAbilityEffect {
	override spellType: LearnableSpellType = 'arcane';
	override spellsLearnFrequency: SpellLearnFrequency = 'even';
	override spellsAttribute: keyof Attributes = 'charisma';
	override circleLearnLevel: Record<SpellCircle, Level> = {
		[SpellCircle.first]: Level.one,
		[SpellCircle.second]: Level.six,
	};

	override description: string = 'Escolha três escolas de magia. Você pode'
  + ' lançar magias arcanas de 1º círculo que pertençam a'
  + ' essas escolas.';

	constructor(schools: Set<SpellSchool>, spells: Spell[]) {
		super(spells, 2, RoleAbilityName.bardSpells, schools);
	}
}
