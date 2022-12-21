import {AddModifierToLifePoints} from '../../Action/AddModifierToLifePoints';
import type {BuildingSheetInterface} from '../../BuildingSheetInterface';
import {Modifier} from '../../Modifier/Modifier';
import {RaceAbility} from '../RaceAbility';
import {RaceAbilityName} from '../RaceAbilityName';

export class HardAsRock extends RaceAbility {
	constructor() {
		super(RaceAbilityName.hardAsRock, 'passive');
	}

	apply(sheet: BuildingSheetInterface): void {
		const modifier = new Modifier(this.name, 3);
		sheet.dispatch(new AddModifierToLifePoints({modifier}));
	}
}
