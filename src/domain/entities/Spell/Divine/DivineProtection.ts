import {AbilityEffects} from '../../Ability';
import {Spell, type SpellType} from '../Spell';
import {SpellCircle} from '../SpellCircle';
import {SpellName} from '../SpellName';
import {SpellSchool} from '../SpellSchool';

export class DivineProtection extends Spell {
	static circle: SpellCircle = SpellCircle.first;
	static school: SpellSchool = SpellSchool.abjuration;
	static spellName: SpellName = SpellName.divineProtection;
	static shortDescription = 'Alvo recebe bônus em testes de resistência.';
	static spellType: SpellType = 'divine';

	override school: SpellSchool = DivineProtection.school;
	override shortDescription = DivineProtection.shortDescription;
	override effects = new AbilityEffects();

	constructor() {
		super(SpellName.divineProtection, SpellCircle.first, DivineProtection.spellType);
	}
}
