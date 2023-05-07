import {AbilityEffects} from '../../Ability/AbilityEffects';
import {Spell} from '../Spell';
import {SpellCircle} from '../SpellCircle';
import {SpellName} from '../SpellName';
import {SpellSchool} from '../SpellSchool';
import {ArcaneArmorDefaultEffect} from './ArcaneArmorDefaultEffect';

export class ArcaneArmor extends Spell {
	static circle = SpellCircle.first;
	static school = SpellSchool.abjuration;
	static spellName = SpellName.arcaneArmor;
	effects = new AbilityEffects({
		activateable: {
			default: new ArcaneArmorDefaultEffect(),
		},
	});

	override school: SpellSchool = ArcaneArmor.school;

	constructor() {
		super(ArcaneArmor.spellName, ArcaneArmor.circle, 'arcane');
	}
}
