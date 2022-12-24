import type {AbilityInterface} from '../Ability/Ability';
import {Ability} from '../Ability/Ability';
import type {AbilityEffect} from '../Ability/AbilityEffect';
import type {BuildingSheetInterface} from '../BuildingSheetInterface';
import type {Dispatch} from '../SheetInterface';
import type {Translatable} from '../Translator';
import type {PowerName} from './PowerName';

export type PowerType = 'general' | 'role';

export type PowerInterface = AbilityInterface & {
	name: PowerName;
	powerType: PowerType;
};

export type Requirement = {
	description: string;
	verify: (sheet: BuildingSheetInterface) => boolean;
};

export abstract class Power extends Ability implements PowerInterface {
	readonly requirements: Requirement[] = [];

	constructor(
		override readonly name: PowerName,
		readonly powerType: PowerType,
	) {
		super(name, 'power');
	}

	override addToSheet(sheet: BuildingSheetInterface, dispatch: Dispatch, source: Translatable): void {
		this.verifyRequirements(sheet);
		super.addToSheet(sheet, dispatch, source);
	}

	protected addRequirement(requirement: Requirement) {
		this.requirements.push(requirement);
	}

	private verifyRequirements(sheet: BuildingSheetInterface) {
		const everyRequirementAchieved = this.requirements.every(requirement => requirement.verify(sheet));

		if (!everyRequirementAchieved) {
			throw new Error('REQUIREMENT_NOT_ACHIEVED');
		}
	}
}
