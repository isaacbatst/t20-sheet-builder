import {AbilityEffects} from '../../../Ability';
import {type Spell, type SpellSchool} from '../../../Spell';
import {RoleAbilityName} from '../../RoleAbilityName';
import {SpellsAbility} from '../../SpellsAbility';
import {DruidSpellsEffect} from './DruidSpellsEffect';

export class DruidSpells extends SpellsAbility {
	override effects: AbilityEffects<{
		passive: {
			default: DruidSpellsEffect;
		};
	}>;

	constructor(spells: Spell[], schools: Set<SpellSchool>) {
		super(RoleAbilityName.druidSpells);
		this.effects = new AbilityEffects({
			passive: {
				default: new DruidSpellsEffect(spells, schools),
			},
		});
	}
}
