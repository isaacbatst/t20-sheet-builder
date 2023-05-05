import type {Static} from '../Static';
import type {Spell} from './Spell';
import type {SpellCircle} from './SpellCircle';
import type {SpellName} from './SpellName';

export type SpellStatic = Static<Spell, {
	circle: SpellCircle;
	spellName: SpellName;
}>;
