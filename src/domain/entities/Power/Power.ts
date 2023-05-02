import type {AbilityInterface} from '../Ability/Ability';
import {Ability} from '../Ability/Ability';
import type {SheetBaseInterface} from '../Sheet/SheetBaseInterface';
import type {PowerName} from './PowerName';

export type PowerType = 'general' | 'role' | 'origin';

export type PowerInterface = AbilityInterface & {
	name: PowerName;
	powerType: PowerType;
	verifyRequirements(sheet: SheetBaseInterface): void;
};

export type RequirementInterface = {
	description: string;
	verify: (sheet: SheetBaseInterface) => boolean;
};

export abstract class Power extends Ability implements PowerInterface {
	readonly requirements: RequirementInterface[] = [];

	constructor(
		override readonly name: PowerName,
		readonly powerType: PowerType,
	) {
		super(name, 'power');
	}

	verifyRequirements(sheet: SheetBaseInterface) {
		const everyRequirementAchieved = this.requirements.every(requirement => requirement.verify(sheet));

		if (!everyRequirementAchieved) {
			throw new Error('UNFULFILLED_REQUIREMENT');
		}
	}

	protected addRequirement(requirement: RequirementInterface) {
		this.requirements.push(requirement);
	}
}
