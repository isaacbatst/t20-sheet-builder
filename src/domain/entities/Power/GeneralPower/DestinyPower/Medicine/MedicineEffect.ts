import {ActivateableAbilityEffect} from '../../../../Ability/ActivateableAbilityEffect';
import type {Cost} from '../../../../Sheet/CharacterSheet/CharacterSheetInterface';
import {GeneralPowerName} from '../../GeneralPowerName';

export class MedicineEffect extends ActivateableAbilityEffect {
	static readonly description = 'Você pode gastar uma ação completa para fazer um teste de Cura (CD 15) em uma criatura. Se você'
	+ ' passar, ela recupera 1d6 PV, mais 1d6 para cada 5'
	+ ' pontos pelos quais o resultado do teste exceder a CD'
	+ ' (2d6 com um resultado 20, 3d6 com um resultado'
	+ ' 25 e assim por diante). Você só pode usar este poder'
	+ ' uma vez por dia numa mesma criatura.';

	override description = MedicineEffect.description;
	baseCosts: Cost[] = [];

	constructor() {
		super({
			duration: 'immediate',
			execution: 'complete',
			source: GeneralPowerName.medicine,
		});
	}
}
