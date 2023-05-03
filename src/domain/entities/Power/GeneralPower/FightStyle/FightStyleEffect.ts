import {ActivateableAbilityEffect} from '../../../Ability/ActivateableAbilityEffect';
import type {Character} from '../../../Character/Character';
import type {Cost} from '../../../Sheet/SheetInterface';
import type {GeneralPowerName} from '../GeneralPowerName';

export abstract class FightStyleEffect extends ActivateableAbilityEffect {
	costs: Cost[] = [];

	constructor(source: GeneralPowerName) {
		super({
			duration: 'immediate',
			execution: 'free',
			source,
		});
	}

	abstract canApply(character: Character): boolean;
}
