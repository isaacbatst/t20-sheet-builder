import {AbilityEffects, type AbilityEffectsInterface} from '../../../Ability';
import {type Spell} from '../../../Spell/Spell';
import {type SpellSchool} from '../../../Spell/SpellSchool';
import {RoleAbility} from '../../RoleAbility';
import {RoleAbilityName} from '../../RoleAbilityName';
import {BardSpellsEffect} from './BardSpellsEffect';

export class BardSpells extends RoleAbility {
	override effects: AbilityEffectsInterface;

	constructor(readonly schools: Set<SpellSchool>, readonly spells: Spell[]) {
		super(RoleAbilityName.bardSpells);
		this.effects = new AbilityEffects({
			passive: {
				default: new BardSpellsEffect(schools, spells),
			},
		});
	}
}
