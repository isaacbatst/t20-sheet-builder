import type {Action, CharacterAction, CharacterActionDescriptionGenerators} from '../CharacterAction';
import type {CharacterInterface} from '../CharacterInterface';
import {InitialAttributesDefinition} from './InitialAttributesDefinition';

export enum Step {
	initialAttributesDefinition = 'initialAttributesDefinition',
	raceAttributesModifiersAppliance = 'raceAttributesModifiersAppliance',
	raceAbilitiesAppliance = 'raceAbilitiesAppliance',
	dodgeAppliance = 'dodgeAppliance',
}

export abstract class StepDescriptionGenerator {
	static generate<T extends CharacterAction>(
		action: Action<T>,
		character: CharacterInterface,
	): string {
		const generateDescription = StepDescriptionGenerator.actionToDescriptionGenerate[action.type];
		return generateDescription(character, action);
	}

	private static readonly actionToDescriptionGenerate: CharacterActionDescriptionGenerators = {
		setInitialAttributes: InitialAttributesDefinition.generate,
		addOtherModifierToDefense: () => '',
		addOtherModifierToSkill: () => '',
		applyAbility: () => '',
		applyRaceModifiers: () => '',
		changeVision: () => '',
		chooseRace: () => '',
		trainSkill: () => '',
	};
}

