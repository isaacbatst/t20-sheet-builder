import {AbilityEffects} from '../../Ability/AbilityEffects';
import {Spell, type SpellType} from '../Spell';
import {SpellCircle} from '../SpellCircle';
import {SpellName} from '../SpellName';
import {SpellSchool} from '../SpellSchool';
import {MentalDaggerDefaultEffect} from './MentalDaggerDefaultEffect';

export class MentalDagger extends Spell {
	static circle = SpellCircle.first;
	static spellName = SpellName.mentalDagger;
	static school = SpellSchool.enchantment;
	static shortDescription = 'Alvo sofre dano psíquico e pode ficar atordoado.';
	static spellType: SpellType = 'arcane';
	override school: SpellSchool = MentalDagger.school;
	override shortDescription: string = MentalDagger.shortDescription;

	effects = new AbilityEffects({
		activateable: {
			default: new MentalDaggerDefaultEffect(),
		},
	});

	constructor() {
		super(MentalDagger.spellName, MentalDagger.circle, 'arcane');
	}
}
