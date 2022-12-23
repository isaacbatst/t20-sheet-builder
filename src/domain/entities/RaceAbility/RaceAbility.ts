import type {AbilityEffectType} from '../Ability/Ability';
import {Ability} from '../Ability/Ability';
import {ApplyRaceAbility} from '../Action/ApplyRaceAbility';
import type {BuildingSheetInterface} from '../BuildingSheetInterface';
import type {Dispatch} from '../SheetInterface';
import type {Translatable} from '../Translator';
import type {RaceAbilityName} from './RaceAbilityName';

export type RaceAbilityInterface = Ability & {
	name: RaceAbilityName;
};

export abstract class RaceAbility extends Ability implements RaceAbilityInterface {
	constructor(
		override readonly name: RaceAbilityName,
		effectType: AbilityEffectType,
	) {
		super(name, effectType, 'race');
	}

	addToSheet(sheet: BuildingSheetInterface, dispatch: Dispatch, source: Translatable): void {
		dispatch(new ApplyRaceAbility({ability: this, source}));
		this.applyEffects(sheet, dispatch);
	}

	protected abstract applyEffects(sheet: BuildingSheetInterface, dispatch: Dispatch): void;
}
