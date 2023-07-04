import {ActivateableAbilityEffect} from '../../Ability';
import {ManaCost} from '../../ManaCost';
import {type Cost} from '../../Sheet';
import {RaceAbilityName} from '../RaceAbilityName';

export class AllihannaArmorEffect extends ActivateableAbilityEffect {
	override baseCosts: Cost[] = [new ManaCost(1)];
	override description: string = 'Você pode gastar'
  + ' uma ação de movimento e 1 PM para transformar'
  + ' sua pele em casca de árvore, recebendo +2 na Defesa'
  + ' até o fim da cena.';

	constructor() {
		super({
			duration: 'scene',
			execution: 'moviment',
			source: RaceAbilityName.allihannaArmor,
		});
	}
}
