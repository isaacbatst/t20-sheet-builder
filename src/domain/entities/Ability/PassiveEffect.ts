import type {SheetBaseInterface} from '../Sheet/SheetBaseInterface';
import type {Dispatch} from '../Sheet/Transaction';
import type {AbilityName} from './Ability';
import {AbilityEffect} from './AbilityEffect';

export abstract class PassiveEffect extends AbilityEffect {
	constructor(source: AbilityName) {
		super('passive', source);
	}

	abstract applyToSheet(sheet: SheetBaseInterface, dispatch: Dispatch): void;
}
