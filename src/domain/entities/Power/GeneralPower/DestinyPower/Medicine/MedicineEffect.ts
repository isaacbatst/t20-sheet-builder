import {ActivateableAbilityEffect} from '../../../../Ability/ActivateableAbilityEffect';
import type {Cost} from '../../../../Sheet/SheetInterface';
import {GeneralPowerName} from '../../GeneralPowerName';

export class MedicineEffect extends ActivateableAbilityEffect {
	costs: Cost[] = [];

	constructor() {
		super({
			duration: 'immediate',
			execution: 'complete',
			source: GeneralPowerName.medicine,
		});
	}
}
