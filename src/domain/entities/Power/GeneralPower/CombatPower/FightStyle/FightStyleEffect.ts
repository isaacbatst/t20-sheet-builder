import {ActivateableAbilityEffect} from '../../../../Ability/ActivateableAbilityEffect';
import {type Character} from '../../../../Character';
import {type Cost} from '../../../../Sheet/CharacterSheetInterface';
import {type GeneralPowerName} from '../../GeneralPowerName';

export abstract class FightStyleEffect extends ActivateableAbilityEffect {
	baseCosts: Cost[] = [];

	constructor(source: GeneralPowerName) {
		super({
			duration: 'immediate',
			execution: 'free',
			source,
		});
	}

	abstract canApply(character: Character): boolean;
}
