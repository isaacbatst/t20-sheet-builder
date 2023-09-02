import {AbilityEffects} from '../../../Ability';
import {type Spell} from '../../../Spell';
import {RoleAbilityName} from '../../RoleAbilityName';
import {SpellsAbility} from '../../SpellsAbility';
import {ClericSpellsEffect} from './ClericSpellsEffect';

export class ClericSpells extends SpellsAbility {
	override effects: AbilityEffects<{
		passive: {
			default: ClericSpellsEffect;
		};
	}>;

	constructor(spells: Spell[]) {
		super(RoleAbilityName.clericSpells);
		this.effects = new AbilityEffects({
			passive: {
				default: new ClericSpellsEffect(spells),
			},
		});
	}
}
