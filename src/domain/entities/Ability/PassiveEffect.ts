import type {BuildingSheetInterface} from '../BuildingSheetInterface';
import type {Dispatch} from '../Sheet/SheetInterface';
import type {Translatable} from '../Translator';
import type {AbilityName} from './Ability';
import {AbilityEffect} from './AbilityEffect';

export abstract class PassiveEffect extends AbilityEffect {
	constructor(source: AbilityName) {
		super('passive', source);
	}

	abstract addToSheet(sheet: BuildingSheetInterface, dispatch: Dispatch, source: Translatable): void;
}
