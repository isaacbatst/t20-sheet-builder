import {type LearnableSpellType, type Spell, type SpellCircle, type SpellName} from '../Spell';
import {type SerializedSheetSpell, type SerializedSheetLearnedCircles} from './SerializedSheet';

export type SpellMap = Map<SpellName, Spell>;
export type SheetLearnedCircles = Record<LearnableSpellType, Set<SpellCircle>>;

export type SheetSpellsInterface = {
	learnCircle(circle: SpellCircle, type: LearnableSpellType): void;
	learnSpell(spell: Spell, needsCircle?: boolean): void;
	getLearnedCircles(): SheetLearnedCircles;
	getSpells(): SpellMap;
	serializeLearnedCircles(): SerializedSheetLearnedCircles;
	serializeSpells(): SerializedSheetSpell[];
};

