import {PassiveEffect} from '../../../Ability/PassiveEffect';
import {ChangeDisplacement} from '../../../Action/ChangeDisplacement';
import type {SheetBaseInterface} from '../../../Sheet/SheetBaseInterface';
import type {Dispatch} from '../../../Sheet/Transaction';
import {RaceAbilityName} from '../../RaceAbilityName';

export class SlowAndAlwaysEffect extends PassiveEffect {
	constructor() {
		super(RaceAbilityName.slowAndAlways);
	}

	applyToSheet(sheet: SheetBaseInterface, dispatch: Dispatch): void {
		dispatch(new ChangeDisplacement({
			displacement: 6,
			source: this.source,
		}), sheet);
	}
}
