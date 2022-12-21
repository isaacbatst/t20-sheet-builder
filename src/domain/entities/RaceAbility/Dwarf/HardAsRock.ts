import {AddModifierToLifePoints} from '../../Action/AddModifierToLifePoints';
import {Modifier} from '../../Modifier/Modifier';
import type {SheetInterface} from '../../SheetInterface';
import {RaceAbility} from '../RaceAbility';
import {RaceAbilityName} from '../RaceAbilityName';

export class HardAsRock extends RaceAbility {
	constructor() {
		super(RaceAbilityName.hardAsRock, 'passive');
	}

	apply(sheet: SheetInterface): void {
		const modifier = new Modifier(this.name, 3);
		sheet.dispatch(new AddModifierToLifePoints({modifier}));
	}
}
