import type {CharacterInterface} from '../Character';
import {InitialAttributesDefinition} from './InitialAttributesDefinition';
import {RaceAttributeModifiersAppliance} from './RaceAttributeModifiersAppliance';

export enum Step {
	initialAttributesDefinition = 'initialAttributesDefinition',
	raceAttributesModifiersAppliance = 'raceAttributesModifiersAppliance',
}

export abstract class StepDescriptionGenerator {
	static generate(
		stepType: string,
		character: CharacterInterface,
	): string {
		if (!this.validateStepType(stepType)) {
			throw new Error('INVALID_STEP_TYPE');
		}

		const generateDescription = StepDescriptionGenerator.stepTypeToGenerateFunction[stepType];

		return generateDescription(character);
	}

	private static readonly stepTypeToGenerateFunction: Record<Step, (character: CharacterInterface) => string> = {
		initialAttributesDefinition: InitialAttributesDefinition.generate,
		raceAttributesModifiersAppliance: RaceAttributeModifiersAppliance.generate,
	};

	private static validateStepType(stepType: string): stepType is Step {
		return stepType in Step;
	}
}

