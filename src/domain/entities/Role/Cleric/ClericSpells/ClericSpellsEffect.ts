import {type Attributes, type Level} from '../../../Sheet';
import {SpellCircle, type LearnableSpellType, type Spell} from '../../../Spell';
import {RoleAbilityName} from '../../RoleAbilityName';
import {type SpellLearnFrequency} from '../../SpellsAbility';
import {SpellsAbilityEffect} from '../../SpellsAbilityEffect';

export class ClericSpellsEffect extends SpellsAbilityEffect {
	override spellType: LearnableSpellType = 'divine';
	override spellsLearnFrequency: SpellLearnFrequency = 'all';
	override spellsAttribute: keyof Attributes = 'wisdom';
	override circleLearnLevel: Record<SpellCircle, Level> = {
		[SpellCircle.first]: 1,
		[SpellCircle.second]: 5,
	};

	override description: string = 'Você pode lançar magias divinas de 1º'
  + ' círculo. A cada quatro níveis, pode lançar magias de'
  + ' um círculo maior (2º círculo no 5º nível, 3º círculo'
  + ' no 9º nível e assim por diante).';

	constructor(spells: Spell[]) {
		super(spells, 3, RoleAbilityName.clericSpells);
	}
}
