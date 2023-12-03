import {RolePlayEffect} from '../../../Ability';
import {GrantedPowerName} from '../GrantedPowerName';

export class LinWuTraditionEffect extends RolePlayEffect {
	static description = 'Você considera a katana uma arma simples e,'
  + ' se for proficiente em armas marciais, recebe +1 na'
  + ' margem de ameaça com ela.';

	constructor() {
		super(GrantedPowerName.linWuTradition, LinWuTraditionEffect.description);
	}
}
