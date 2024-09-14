import {RolePlayEffect} from '../../../../Ability';
import {GeneralPowerName} from '../../GeneralPowerName';

export class CommandEffect extends RolePlayEffect {
	static description = 'Você pode gastar uma ação de movimento e 1 PM para gritar ordens para seus aliados em alcance médio. Eles recebem +1 em testes de perícia até o fim da cena.';

	constructor() {
		super(GeneralPowerName.command, CommandEffect.description);
	}
}
