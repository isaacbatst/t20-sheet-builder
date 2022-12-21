import type {AbilityEffectType, AbilityInterface} from '../Ability';
import {Ability} from '../Ability';
import type {SheetInterface} from '../SheetInterface';
import type {PowerName} from './PowerName';

export type PowerType = 'general' | 'class';

export type PowerInterface = AbilityInterface & {
	name: PowerName;
	powerType: PowerType;
};

export type Requirement = {
	description: string;
	verify: (sheet: SheetInterface) => boolean;
};

export abstract class Power extends Ability implements PowerInterface {
	readonly powerType: PowerType;
	readonly requirements: Requirement[] = [];

	constructor(override readonly name: PowerName, effectType: AbilityEffectType, powerType: PowerType) {
		super(name, effectType);
		this.powerType = powerType;
	}

	protected addRequirement(requirement: Requirement) {
		this.requirements.push(requirement);
	}

	protected verifyRequirements(sheet: SheetInterface) {
		const everyRequirementAchieved = this.requirements.every(requirement => requirement.verify(sheet));

		if (!everyRequirementAchieved) {
			throw new Error('REQUIREMENT_NOT_ACHIEVED');
		}
	}
}
