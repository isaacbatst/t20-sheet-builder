import type {Character} from './Character';

export enum StepType {
	initialAttributesDefinition = 'initialAttributesDefinition',
	raceAttributesModifiersAppliance = 'raceAttributesModifiersAppliance',
}

export class StepDescriptionGenerator {
	static generateDescription(
		stepType: string,
		character: Character,
	): string {
		if (!this.validateStepType(stepType)) {
			throw new Error('INVALID_STEP_TYPE');
		}

		const generateThisDescription = StepDescriptionGenerator.stepTypeToDescription[stepType];

		return generateThisDescription(character);
	}

	private static readonly stepTypeToDescription: Record<StepType, (character: Character) => string> = {
		initialAttributesDefinition(character: Character) {
			return `Definição inicial de atributos: Força ${character.attributes.strength}, Destreza ${character.attributes.dexterity}, Constituição ${character.attributes.constitution}, Inteligência ${character.attributes.intelligence}, Sabedoria ${character.attributes.wisdom} e Carisma ${character.attributes.charisma}`;
		},
		raceAttributesModifiersAppliance(character: Character) {
			return `Aplicação dos modificadores de atributo da raça: ${character.race.attributeModifiersText}`;
		},
	};

	private static validateStepType(stepType: string): stepType is StepType {
		return stepType in StepType;
	}
}
