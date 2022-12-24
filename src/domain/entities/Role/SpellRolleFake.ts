import type {Attribute} from '../Attributes';
import type {Level} from '../Levels';
import type {SpellType} from '../Spell/Spell';
import {SpellCircle} from '../Spell/SpellCircle';
import type {SpellLearnFrequency, SpellRoleInterface} from './SpellRole';
import {SpellRoleName} from './SpellRole';

export class SpellRoleFake implements SpellRoleInterface {
	spellType: SpellType = 'arcane';
	initialSpells = 3;
	spellsLearnFrequency: SpellLearnFrequency = 'all';
	spellsAttribute: Attribute = 'intelligence';
	circleMinLevel: Record<SpellCircle, Level> = {
		[SpellCircle.first]: 1,
		[SpellCircle.second]: 5,
	};

	name: SpellRoleName = SpellRoleName.arcanist;
}
