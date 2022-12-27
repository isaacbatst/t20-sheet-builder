import {PassiveEffect} from '../../Ability/PassiveEffect';
import {AddFixedModifierToLifePoints} from '../../Action/AddFixedModifierToLifePoints';
import {FixedModifier} from '../../Modifier/FixedModifier/FixedModifier';
import type {SheetBaseInterface} from '../../Sheet/SheetBaseInterface';
import type {Dispatch} from '../../Transaction';
import {RaceAbilityName} from '../RaceAbilityName';

export class HardAsRockInitialEffect extends PassiveEffect {
	constructor() {
		super(RaceAbilityName.hardAsRock);
	}

	addToSheet(sheet: SheetBaseInterface, dispatch: Dispatch): void {
		const modifier = new FixedModifier(this.source, 3);
		dispatch(new AddFixedModifierToLifePoints({modifier}), sheet);
	}
}
