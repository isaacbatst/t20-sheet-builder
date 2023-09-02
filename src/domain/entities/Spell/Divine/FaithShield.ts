import {AbilityEffects} from '../../Ability';
import {Spell, type SpellType} from '../Spell';
import {SpellCircle} from '../SpellCircle';
import {SpellName} from '../SpellName';
import {SpellSchool} from '../SpellSchool';

export class FaithShield extends Spell {
	static circle: SpellCircle = SpellCircle.first;
	static school: SpellSchool = SpellSchool.abjuration;
	static spellName: SpellName = SpellName.faithShield;
	static shortDescription = 'Alvo recebe bônus em testes de resistência.';
	static spellType: SpellType = 'divine';

	override school: SpellSchool = FaithShield.school;
	override shortDescription = 'Protege uma criatura.';
	override effects = new AbilityEffects();

	constructor() {
		super(SpellName.faithShield, SpellCircle.first, 'divine');
	}
}
