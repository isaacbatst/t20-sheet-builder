import {type Character} from '../../../../Character';
import {GeneralPowerName} from '../../GeneralPowerName';
import {FightStyleEffect} from './FightStyleEffect';

export class OneWeaponStyleEffect extends FightStyleEffect {
	static description = 'Se estiver usando uma arma corpo a corpo em uma das mãos '
	+ ' e nada na outra, você recebe +2 na Defesa e nos testes de ataque com essa arma';

	get description() {
		return OneWeaponStyleEffect.description;
	}

	constructor() {
		super(GeneralPowerName.oneWeaponStyle);
	}

	canApply(character: Character): boolean {
		const wieldedItems = character.getWieldedItems();
		return wieldedItems.length === 1;
	}
}
