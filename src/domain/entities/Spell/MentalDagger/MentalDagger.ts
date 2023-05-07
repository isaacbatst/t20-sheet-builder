import {AbilityEffects} from '../../Ability/AbilityEffects';
import {Spell} from '../Spell';
import {SpellCircle} from '../SpellCircle';
import {SpellName} from '../SpellName';
import {SpellSchool} from '../SpellSchool';
import {MentalDaggerDefaultEffect} from './MentalDaggerDefaultEffect';

export class MentalDagger extends Spell {
	static circle = SpellCircle.first;
	static spellName = SpellName.mentalDagger;
	static school = SpellSchool.enchantment;
	override school: SpellSchool = MentalDagger.school;
	effects = new AbilityEffects({
		activateable: {
			default: new MentalDaggerDefaultEffect(),
		},
	});

	constructor() {
		super(MentalDagger.spellName, MentalDagger.circle, 'arcane');
	}
}
