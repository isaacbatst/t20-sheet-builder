import {AbilityEffects, RolePlayEffect} from '../../../Ability';
import {RaceAbility} from '../../RaceAbility';
import {RaceAbilityName} from '../../RaceAbilityName';

export class Desires extends RaceAbility {
	static effectDescription = 'Se lançar uma magia que alguém tenha'
  + ' pedido desde seu último turno, o custo da magia'
  + ' diminui em –1 PM. Fazer um desejo ao qareen é uma'
  + ' ação livre.';

	override effects = new AbilityEffects({
		roleplay: {
			default: new RolePlayEffect(RaceAbilityName.desires, Desires.effectDescription),
		},
	});

	constructor() {
		super(RaceAbilityName.desires);
	}
}
