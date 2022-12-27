import {PassiveEffect} from '../../Ability/PassiveEffect';
import {ChangeDisplacement} from '../../Action/ChangeDisplacement';
import type {SheetBaseInterface} from '../../Sheet/SheetBaseInterface';
import type {Dispatch} from '../../Sheet/SheetInterface';
import {RaceAbilityName} from '../RaceAbilityName';

export class SlowAndAlwaysEffect extends PassiveEffect {
	constructor() {
		super(RaceAbilityName.slowAndAlways);
	}

	addToSheet(sheet: SheetBaseInterface, dispatch: Dispatch): void {
		dispatch(new ChangeDisplacement({
			displacement: 6,
			source: this.source,
		}));
	}
}
