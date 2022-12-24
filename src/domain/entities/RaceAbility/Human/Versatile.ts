import type {BuildingSheetInterface} from '../../Sheet/BuildingSheetInterface';
import {RaceName} from '../../Race/RaceName';
import type {Dispatch} from '../../Sheet/SheetInterface';
import {RaceAbility} from '../RaceAbility';
import {RaceAbilityName} from '../RaceAbilityName';
import type {VersatileChoice} from './VersatileEffect';
import {VersatileEffect} from './VersatileEffect';

export class Versatile extends RaceAbility {
	effects = {
		default: new VersatileEffect(),
	};

	constructor() {
		super(RaceAbilityName.versatile);
	}

	addChoice(choice: VersatileChoice) {
		this.effects.default.addChoice(choice);
	}
}
