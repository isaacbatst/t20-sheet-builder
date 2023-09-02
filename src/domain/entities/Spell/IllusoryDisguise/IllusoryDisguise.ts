import {AbilityEffects} from '../../Ability/AbilityEffects';
import {Spell, type SpellType} from '../Spell';
import {SpellCircle} from '../SpellCircle';
import {SpellName} from '../SpellName';
import {SpellSchool} from '../SpellSchool';
import {IllusoryDisguiseDefaultEffect} from './IllusoryDisguiseDefaultEffect';

export class IllusoryDisguise extends Spell {
	static spellName = SpellName.illusoryDisguise;
	static circle = SpellCircle.first;
	static school = SpellSchool.illusion;
	static shortDescription = 'Muda a aparência de uma ou mais criaturas.';
	static spellType: SpellType = 'arcane';
	override shortDescription: string = IllusoryDisguise.shortDescription;

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
