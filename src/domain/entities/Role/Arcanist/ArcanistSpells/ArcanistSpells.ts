import {RoleAbility} from '../../RoleAbility';
import {RoleAbilityName} from '../../RoleAbilityName';
import {ArcanistSpellsEffect} from './ArcanistSpellsEffect';

export class ArcanistSpells extends RoleAbility {
	effects = {
		default: new ArcanistSpellsEffect(),
	};

	constructor() {
		super(RoleAbilityName.arcanistSpells);
	}
}
