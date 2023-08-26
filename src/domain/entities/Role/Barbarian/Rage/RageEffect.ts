import {ActivateableAbilityEffect} from '../../../Ability';
import {ManaCost} from '../../../ManaCost';
import {type Cost} from '../../../Sheet';
import {RoleAbilityName} from '../../RoleAbilityName';

export class RageEffect extends ActivateableAbilityEffect {
	override baseCosts: Cost[] = [new ManaCost(2)];
	override description: string = 'Você pode gastar 2 PM para invocar'
  + ' uma fúria selvagem. Você recebe +2 em testes de'
  + ' ataque e rolagens de dano corpo a corpo, mas não'
  + ' pode fazer nenhuma ação que exija calma e concentração'
  + ' (como usar a perícia Furtividade ou lançar'
  + ' magias). A cada cinco níveis, pode gastar +1 PM'
  + ' para aumentar os bônus em +1.';

	constructor() {
		super({
			duration: 'scene',
			execution: 'free',
			source: RoleAbilityName.rage,
		});
	}
}
