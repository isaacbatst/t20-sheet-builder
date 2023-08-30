import {ActivateableAbilityEffect} from '../../../Ability';
import {ManaCost} from '../../../ManaCost';
import {type Cost} from '../../../Sheet';
import {RoleAbilityName} from '../../RoleAbilityName';

export class PreyMarkEffect extends ActivateableAbilityEffect {
	override baseCosts: Cost[] = [new ManaCost(1)];
	override description: string = 'Você pode gastar uma ação'
  + ' de movimento e 1 PM para analisar uma criatura em'
  + ' alcance curto. Até o fim da cena, você recebe +1d4'
  + ' nas rolagens de dano contra essa criatura. A cada'
  + ' quatro níveis, você pode gastar +1 PM para aumentar'
  + ' o bônus de dano (veja a tabela da classe).';

	constructor() {
		super({
			duration: 'scene',
			execution: 'moviment',
			source: RoleAbilityName.preyMark,
		});
	}
}
