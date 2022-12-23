import type {AbilityEffectType, AbilityInterface} from '../Ability/Ability';
import type {Action} from '../Action/Action';
import type {BuildingSheetInterface} from '../BuildingSheetInterface';
import type {ActionType} from '../SheetActions';
import type {Dispatch} from '../SheetInterface';
import type {Translatable} from '../Translator';
import type {PowerName} from './PowerName';

export type PowerType = 'general' | 'role';

export type PowerInterface = AbilityInterface & {
	name: PowerName;
	type: PowerType;
};

export type Requirement = {
	description: string;
	verify: (sheet: BuildingSheetInterface) => boolean;
};

export abstract class Power implements PowerInterface {
	readonly requirements: Requirement[] = [];

	constructor(
		readonly name: PowerName,
		readonly effectType: AbilityEffectType,
		readonly type: PowerType,
	) {}

	addToSheet(sheet: BuildingSheetInterface, dispatch: Dispatch, source: Translatable): void {
		this.verifyRequirements(sheet);
		dispatch(this.getAction(source));
		this.applyEffects(sheet, dispatch);
	}

	protected addRequirement(requirement: Requirement) {
		this.requirements.push(requirement);
	}

	protected abstract getAction(source: Translatable): Action<ActionType>;
	protected abstract applyEffects(sheet: BuildingSheetInterface, dispatch: Dispatch): void;

	private verifyRequirements(sheet: BuildingSheetInterface) {
		const everyRequirementAchieved = this.requirements.every(requirement => requirement.verify(sheet));

		if (!everyRequirementAchieved) {
			throw new Error('REQUIREMENT_NOT_ACHIEVED');
		}
	}
}
