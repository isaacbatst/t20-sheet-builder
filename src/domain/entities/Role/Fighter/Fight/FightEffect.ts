import {RolePlayEffect} from '../../../Ability';
import {RoleAbilityName} from '../../RoleAbilityName';

export class FightEffect extends RolePlayEffect {
	static readonly description = 'Seus ataques desarmados causam'
  + ' 1d6 pontos de dano e podem causar dano letal ou não letal (sem penalidades).'
  + ' A cada quatro níveis, seu dano desarmado aumenta, conforme a tabela.'
  + ' O dano na tabela é para criaturas Pequenas e Médias. Criaturas Minúsculas'
  + ' diminuem esse dano em um passo, Grandes e Enormes aumentam em um passo e Colossais'
  + ' aumentam em dois passos.';

	constructor() {
		super(RoleAbilityName.fight, FightEffect.description);
	}
}
