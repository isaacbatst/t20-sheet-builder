import {RolePlayEffect} from '../../../Ability';
import {OriginPowerName} from '../OriginPowerName';

export class FruitsOfLaborEffect extends RolePlayEffect {
	static description = 'No início de cada aventura, você recebe até 5 itens gerais que possa fabricar '
  + 'num valor total de até T$ 50. Esse valor aumenta para T$ 100 no patamar aventureiro, T$ 300 no '
  + 'heroico e T$ 500 no lenda.';

	constructor() {
		super(OriginPowerName.fruitsOfLabor, FruitsOfLaborEffect.description);
	}
}
