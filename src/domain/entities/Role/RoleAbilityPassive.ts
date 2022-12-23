import type {BuildingSheetInterface} from '../BuildingSheetInterface';
import type {Dispatch} from '../SheetInterface';
import type {Translatable} from '../Translator';
import {RoleAbility} from './RoleAbility';
import type {RoleAbilityName} from './RoleAbilityName';

export abstract class RoleAbilityPassive extends RoleAbility {
	constructor(name: RoleAbilityName) {
		super(name, 'passive');
	}

	override addToSheet(sheet: BuildingSheetInterface, dispatch: Dispatch, source: Translatable): void {
		super.addToSheet(sheet, dispatch, source);
		this.applyEffects(sheet, dispatch);
	}

	abstract applyEffects(sheet: BuildingSheetInterface, dispatch: Dispatch): void;
}
