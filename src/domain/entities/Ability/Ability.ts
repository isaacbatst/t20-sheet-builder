import type {PowerName} from '../Power/PowerName';
import type {RaceAbilityName} from '../RaceAbility/RaceAbilityName';
import type {RoleAbilityName} from '../Role/RoleAbilityName';
import type {ActionInterface} from '../Sheet/SheetActions';
import type {SheetBaseInterface} from '../Sheet/SheetBaseInterface';
import type {SpellName} from '../Spell/SpellName';
import type {Dispatch} from '../Transaction';
import type {Translatable} from '../Translator';
import type {AbilityEffect} from './AbilityEffect';
import {PassiveEffect} from './PassiveEffect';
import {TriggeredEffect} from './TriggeredEffect';

export type AbilityType = 'role' | 'race' | 'spell' | 'power';

export type AbilityInterface = {
	name: string;
	effects: Record<string, AbilityEffect>;
	abilityType: AbilityType;
	addToSheet(sheet: SheetBaseInterface, dispatch: Dispatch, source: Translatable): void;
};

export type AbilityName = RoleAbilityName | PowerName | RaceAbilityName | SpellName;

export abstract class Ability implements AbilityInterface {
	abstract readonly effects: Record<string, AbilityEffect>;
	constructor(
		readonly name: AbilityName,
		readonly abilityType: AbilityType,
	) {}

	addToSheet(sheet: SheetBaseInterface, dispatch: Dispatch, source: Translatable): void {
		dispatch(this.getAddAction(source), sheet);
		this.addEffectsToSheet(sheet, dispatch, source);
	}

	protected abstract getAddAction(source: Translatable): ActionInterface;

	private addEffectsToSheet(sheet: SheetBaseInterface, dispatch: Dispatch, source: Translatable) {
		Object.values(this.effects).forEach(effect => {
			effect.addToSheet(sheet, dispatch);
		});
	}
}
