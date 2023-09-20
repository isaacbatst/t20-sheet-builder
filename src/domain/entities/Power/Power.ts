import {SheetBuilderError} from '../../errors/SheetBuilderError';
import {UnfulfilledRequirementError} from '../../errors/UnfulfilledRequirementError';
import type {AbilityInterface} from '../Ability/Ability';
import {Ability} from '../Ability/Ability';
import {type SheetInterface} from '../Sheet/SheetInterface';
import type {PowerName} from './PowerName';

export type PowerType = 'general' | 'role' | 'origin' | 'granted';

export type PowerInterface = AbilityInterface & {
	name: PowerName;
	powerType: PowerType;
	verifyRequirements(sheet: SheetInterface): void;
};

export type RequirementInterface = {
	description: string;
	verify: (sheet: SheetInterface) => boolean;
};

export abstract class Power extends Ability implements PowerInterface {
	readonly requirements: RequirementInterface[] = [];

	constructor(
		override readonly name: PowerName,
		readonly powerType: PowerType,
	) {
		super(name, 'power');
	}

	verifyRequirements(sheet: SheetInterface) {
		const requirementNotMet = this.requirements.find(requirement => !requirement.verify(sheet));

		if (requirementNotMet) {
			throw new UnfulfilledRequirementError(requirementNotMet);
		}
	}

	protected addRequirement(requirement: RequirementInterface) {
		this.requirements.push(requirement);
	}
}
