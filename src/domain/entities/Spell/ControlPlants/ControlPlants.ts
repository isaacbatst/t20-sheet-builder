import {Spell, type SpellType} from '../Spell';
import {SpellCircle} from '../SpellCircle';
import {SpellName} from '../SpellName';
import {SpellSchool} from '../SpellSchool';
import {AbilityEffects} from '../../Ability';
import {ControlPlantsDefaultEffect} from './ControlPlantsDefaultEffect';

export class ControlPlants extends Spell {
	static readonly circle = SpellCircle.first;
	static readonly school = SpellSchool.transmutation;
	static readonly spellName = SpellName.controlPlants;
	static spellType: SpellType = 'arcane';

	static get shortDescription() {
		return 'Vegetação enreda criaturas.';
	}

	override school: SpellSchool = ControlPlants.school;
	override shortDescription: string = ControlPlants.shortDescription;
	override effects = new AbilityEffects({
		activateable: {
			default: new ControlPlantsDefaultEffect(),
		},
	});

	constructor() {
		super(ControlPlants.spellName, ControlPlants.circle, 'arcane');
	}
}
