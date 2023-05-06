import {SheetBuilderError} from '../Error/SheetBuilderError';
import type {AbilityInterface} from '../Ability/Ability';
import {Ability} from '../Ability/Ability';
import type {BuildingSheetInterface} from '../Sheet/BuildingSheetInterface';
import type {PowerName} from './PowerName';

export type PowerType = 'general' | 'role' | 'origin';

export type PowerInterface = AbilityInterface & {
	name: PowerName;
	powerType: PowerType;
	verifyRequirements(sheet: BuildingSheetInterface): void;
};

export type RequirementInterface = {
	description: string;
	verify: (sheet: BuildingSheetInterface) => boolean;
};

export abstract class Power extends Ability implements PowerInterface {
	readonly requirements: RequirementInterface[] = [];

	constructor(
		override readonly name: PowerName,
		readonly powerType: PowerType,
	) {
		super(name, 'power');
	}

	verifyRequirements(sheet: BuildingSheetInterface) {
		const everyRequirementAchieved = this.requirements.every(requirement => requirement.verify(sheet));

		if (!everyRequirementAchieved) {
			throw new SheetBuilderError('UNFULFILLED_REQUIREMENT');
		}
	}

	protected addRequirement(requirement: RequirementInterface) {
		this.requirements.push(requirement);
	}
}
