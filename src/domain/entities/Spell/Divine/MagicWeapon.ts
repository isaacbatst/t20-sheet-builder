import {AbilityEffects} from '../../Ability';
import {Spell, type SpellType} from '../Spell';
import {SpellCircle} from '../SpellCircle';
import {SpellName} from '../SpellName';
import {SpellSchool} from '../SpellSchool';

export class MagicWeapon extends Spell {
	static circle: SpellCircle = SpellCircle.first;
	static school: SpellSchool = SpellSchool.transmutation;
	static spellName: SpellName = SpellName.magicWeapon;
	static shortDescription = 'Alvo recebe bônus em testes de resistência.';
	static spellType: SpellType = 'divine';

	override school: SpellSchool = MagicWeapon.school;
	override shortDescription = MagicWeapon.shortDescription;
	override effects = new AbilityEffects();

	constructor() {
		super(SpellName.magicWeapon, SpellCircle.first, 'divine');
	}
}
