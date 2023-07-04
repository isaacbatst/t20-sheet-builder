import {Spell, SpellCircle, SpellName, SpellSchool} from '..';
import {AbilityEffects, type AbilityEffectsInterface} from '../../Ability';

export class ControlPlants extends Spell {
	static readonly circle = SpellCircle.first;
	static readonly school = SpellSchool.transmutation;
	static readonly spellName = SpellName.controlPlants;
	static get shortDescription() {
		return 'Vegetação enreda criaturas.';
	}

	override school: SpellSchool = ControlPlants.school;
	override shortDescription: string = ControlPlants.shortDescription;
	override effects = new AbilityEffects();

	constructor() {
		super(ControlPlants.spellName, ControlPlants.circle, 'arcane');
	}
}
