import type {Static} from '../Static';
import type {Spell, SpellType} from './Spell';
import type {SpellCircle} from './SpellCircle';
import type {SpellName} from './SpellName';
import {type SpellSchool} from './SpellSchool';

export type SpellStatic = Static<Spell, {
	circle: SpellCircle;
	school: SpellSchool;
	spellName: SpellName;
	shortDescription: string;
	spellType: SpellType;
}>;
