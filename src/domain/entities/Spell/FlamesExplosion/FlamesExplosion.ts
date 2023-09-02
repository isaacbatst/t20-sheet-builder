import {AbilityEffects} from '../../Ability/AbilityEffects';
import {Spell, type SpellType} from '../Spell';
import {SpellCircle} from '../SpellCircle';
import {SpellName} from '../SpellName';
import {SpellSchool} from '../SpellSchool';
import {FlamesExplosionDefaultEffect} from './FlamesExplosionDefaultEffect';

export class FlamesExplosion extends Spell {
	static circle = SpellCircle.first;
	static school = SpellSchool.evocation;
	static spellName = SpellName.flamesExplosion;
	static shortDescription = 'Cone causa dano de fogo.';
	static spellType: SpellType = 'arcane';
	override shortDescription: string = FlamesExplosion.shortDescription;

	effects = new AbilityEffects({
		activateable: {
			default: new FlamesExplosionDefaultEffect(),
		},
	});

	override school: SpellSchool = FlamesExplosion.school;
	constructor() {
		super(FlamesExplosion.spellName, FlamesExplosion.circle, 'arcane');
	}
}
