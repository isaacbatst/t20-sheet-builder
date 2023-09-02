import {AbilityEffects} from '../../Ability';
import {Spell, type SpellType} from '../Spell';
import {SpellCircle} from '../SpellCircle';
import {SpellName} from '../SpellName';
import {SpellSchool} from '../SpellSchool';

export class CureWounds extends Spell {
	static circle: SpellCircle = SpellCircle.first;
	static school: SpellSchool = SpellSchool.evocation;
	static spellName: SpellName = SpellName.cureWounds;
	static shortDescription = 'Seu toque recupera pontos de vida.';
	static spellType: SpellType = 'divine';

	override school: SpellSchool = CureWounds.school;
	override shortDescription = CureWounds.shortDescription;
	override effects = new AbilityEffects();

	constructor() {
		super(SpellName.cureWounds, CureWounds.circle, 'divine');
	}
}
