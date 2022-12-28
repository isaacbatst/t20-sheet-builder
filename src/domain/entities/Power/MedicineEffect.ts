import {ActivateableAbilityEffect} from '../Ability/ActivateableAbilityEffect';
import type {Appliable} from '../Sheet/SheetInterface';
import {GeneralPowerName} from './GeneralPowerName';

export class MedicineEffect extends ActivateableAbilityEffect {
	costs: Appliable[] = [];

	constructor() {
		super({
			duration: 'immediate',
			execution: 'complete',
			source: GeneralPowerName.medicine,
		});
	}
}
