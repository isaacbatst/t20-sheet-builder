import {type LearnableSpellType, type Spell, type SpellCircle, type SpellName} from '../Spell';

export type SpellMap = Map<SpellName, Spell>;
export type SheetLearnedCircles = Record<LearnableSpellType, Set<SpellCircle>>;

export type SheetSpellsInterface = {
	learnCircle(circle: SpellCircle, type: LearnableSpellType): void;
	learnSpell(spell: Spell): void;
	getLearnedCircles(): SheetLearnedCircles;

	getSpells(): SpellMap;
};
