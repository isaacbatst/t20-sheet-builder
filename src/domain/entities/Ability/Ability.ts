import type {PowerName} from '../Power/PowerName';
import type {RaceAbilityName} from '../Race/RaceAbilityName';
import type {RoleAbilityName} from '../Role/RoleAbilityName';
import type {ActionInterface} from '../Sheet/SheetActions';
import type {SheetBaseInterface} from '../Sheet/SheetBaseInterface';
import type {SpellName} from '../Spell/SpellName';
import type {Dispatch} from '../Sheet/Transaction';
import type {Translatable} from '../Translator';
import type {AbilityEffectsInterface} from './AbilityEffects';

export type AbilityType = 'role' | 'race' | 'spell' | 'power';

export type AbilityInterface = {
	name: string;
	effects: AbilityEffectsInterface;
	abilityType: AbilityType;
	addToSheet(sheet: SheetBaseInterface, dispatch: Dispatch, source: Translatable): void;
};

export type AbilityName = RoleAbilityName | PowerName | RaceAbilityName | SpellName;

export abstract class Ability implements AbilityInterface {
	abstract readonly effects: AbilityEffectsInterface;
	constructor(
		readonly name: AbilityName,
		readonly abilityType: AbilityType,
	) {}

	addToSheet(sheet: SheetBaseInterface, dispatch: Dispatch, source: Translatable): void {
		const addAction = this.getAddAction(source);
		dispatch(addAction, sheet);
		this.applyPassiveEffects(sheet, dispatch, source);
	}

	protected abstract getAddAction(source: Translatable): ActionInterface;

	private applyPassiveEffects(sheet: SheetBaseInterface, dispatch: Dispatch, source: Translatable) {
		Object.values(this.effects.passive).forEach(effect => {
			effect.applyToSheet(sheet, dispatch);
		});
	}
}
