import {ActivateableAbilityEffect} from '../../../Ability';
import {ManaCost} from '../../../ManaCost';
import {type Cost} from '../../../Sheet';
import {RoleAbilityName} from '../../RoleAbilityName';

export class InspirationEffect extends ActivateableAbilityEffect {
	override baseCosts: Cost[] = [new ManaCost(2)];
	override description: string = 'Você pode gastar uma ação padrão'
  + ' e 2 PM para inspirar as pessoas com sua arte. Você e'
  + ' todos os seus aliados em alcance curto ganham +1'
  + ' em testes de perícia até o fim da cena. A cada quatro'
  + ' níveis, pode gastar +2 PM para aumentar o bônus'
  + ' em +1.';

	constructor() {
		super({
			duration: 'scene',
			execution: 'default',
			source: RoleAbilityName.inspiration,
		});
	}
}
