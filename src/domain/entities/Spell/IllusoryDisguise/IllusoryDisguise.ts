import {AbilityEffects} from '../../Ability/AbilityEffects';
import {Spell} from '../Spell';
import {SpellCircle} from '../SpellCircle';
import {SpellName} from '../SpellName';
import {SpellSchool} from '../SpellSchool';
import {IllusoryDisguiseDefaultEffect} from './IllusoryDisguiseDefaultEffect';

export class IllusoryDisguise extends Spell {
	static spellName = SpellName.illusoryDisguise;
	static circle = SpellCircle.first;
	static school = SpellSchool.illusion;
	effects = new AbilityEffects({
		activateable: {
			default: new IllusoryDisguiseDefaultEffect(),
		},
	});

	override school: SpellSchool = IllusoryDisguise.school;

	constructor() {
		super(IllusoryDisguise.spellName, IllusoryDisguise.circle, 'arcane');
	}
}
