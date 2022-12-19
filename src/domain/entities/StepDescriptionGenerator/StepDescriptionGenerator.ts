import type {CharacterInterface} from '../Character';
import {InitialAttributesDefinition} from './InitialAttributesDefinition';
import {RaceAbilitiesAppliance} from './RaceAbilitiesAppliance';
import {RaceAttributeModifiersAppliance} from './RaceAttributeModifiersAppliance';

export enum Step {
	initialAttributesDefinition = 'initialAttributesDefinition',
	raceAttributesModifiersAppliance = 'raceAttributesModifiersAppliance',
	raceAbilitiesAppliance = 'raceAbilitiesAppliance',
}

export abstract class StepDescriptionGenerator {
	static generate(
		step: string,
		character: CharacterInterface,
	): string {
		if (!this.validateStep(step)) {
			throw new Error('INVALID_STEP_TYPE');
		}

		const generateDescription = StepDescriptionGenerator.stepTypeToGenerateFunction[step];

		return generateDescription(character);
	}

	private static readonly stepTypeToGenerateFunction: Record<Step, (character: CharacterInterface) => string> = {
		initialAttributesDefinition: InitialAttributesDefinition.generate,
		raceAttributesModifiersAppliance: RaceAttributeModifiersAppliance.generate,
		raceAbilitiesAppliance: RaceAbilitiesAppliance.generate,
	};

	private static validateStep(step: string): step is Step {
		return step in Step;
	}
}

