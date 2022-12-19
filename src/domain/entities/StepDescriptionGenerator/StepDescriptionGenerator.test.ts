import {CharacterFake} from '../CharacterFake';
import {Step, StepDescriptionGenerator} from './StepDescriptionGenerator';

describe('StepDescriptionGenerator', () => {
	it('should not allow invalid step', () => {
		expect(() => {
			const description = StepDescriptionGenerator.generate(
				'invalid-step',
				new CharacterFake(),
			);
		});
	});

	it('should generate initialAttributesDefinition description', () => {
		const character = new CharacterFake();
		character.attributes = {
			...character.attributes,
			charisma: 1,
			constitution: -1,
		};

		const description = StepDescriptionGenerator.generate(
			Step.initialAttributesDefinition,
			character,
		);
		expect(description).toBe('Definição inicial de atributos: Força 0, Destreza 0, Constituição -1, Inteligência 0, Sabedoria 0 e Carisma 1.');
	});

	it('should generate raceAbilitiesAppliance description', () => {
		const character = new CharacterFake();
		character.attributes = {
			...character.attributes,
			charisma: 1,
			constitution: -1,
		};

		const description = StepDescriptionGenerator.generate(
			Step.raceAbilitiesAppliance,
			character,
		);
		expect(description).toBe('Habilidades da raça any-race aplicadas.');
	});
});
