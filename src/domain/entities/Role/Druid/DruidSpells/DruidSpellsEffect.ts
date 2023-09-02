import {Level, type Attributes} from '../../../Sheet';
import {SpellCircle, type LearnableSpellType, type Spell, type SpellSchool} from '../../../Spell';
import {RoleAbilityName} from '../../RoleAbilityName';
import {type SpellLearnFrequency} from '../../SpellsAbility';
import {SpellsAbilityEffect} from '../../SpellsAbilityEffect';

export class DruidSpellsEffect extends SpellsAbilityEffect {
	override spellType: LearnableSpellType = 'divine';
	override spellsLearnFrequency: SpellLearnFrequency = 'even';
	override spellsAttribute: keyof Attributes = 'wisdom';
	override circleLearnLevel: Record<SpellCircle, Level> = {
		[SpellCircle.first]: Level.one,
		[SpellCircle.second]: Level.six,
	};

	override description: string = 'Escolha três escolas de magia. Uma vez'
  + ' feita, essa escolha não pode ser mudada. Você pode'
  + ' lançar magias divinas de 1º círculo que pertençam a'
  + ' essas escolas. À medida que sobe de nível, pode lançar'
  + ' magias de círculos maiores (2º círculo no 6º nível,'
  + ' 3º círculo no 10º nível e 4º círculo no 14º nível).';

	constructor(spells: Spell[], schools: Set<SpellSchool>) {
		super(spells, 2, RoleAbilityName.druidSpells, schools);
	}
}
