import type {Spell} from './Spell';
import type {SpellCircle} from './SpellCircle';
import type {SpellName} from './SpellName';

export type SpellStatic = {
	circle: SpellCircle;
	spellName: SpellName;
	new(): Spell;
};
