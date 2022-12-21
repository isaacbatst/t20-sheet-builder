import {AddModifierToLifePoints} from '../../Action/AddModifierToLifePoints';
import {Modifier} from '../../Modifier/Modifier';
import type {SheetInterface} from '../../SheetInterface';
import {RaceAbility} from '../RaceAbility';
import {RaceAbilityName} from '../RaceAbilityName';

export class HardAsRock extends RaceAbility {
	constructor() {
		super(RaceAbilityName.hardAsRock, 'passive');
	}

	apply(character: SheetInterface): void {
		const modifier = new Modifier(this.name, 3);
		character.dispatch(new AddModifierToLifePoints({modifier}));
	}
}
