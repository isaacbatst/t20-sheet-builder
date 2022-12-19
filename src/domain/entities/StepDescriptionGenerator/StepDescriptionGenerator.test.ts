import {Character} from '../Character';
import {StepDescriptionGenerator, Step} from './StepDescriptionGenerator';

describe('StepDescriptionGenerator', () => {
	it('should generate initialAttributesDefinition description', () => {
		const description = StepDescriptionGenerator.generate(
			Step.initialAttributesDefinition,
			new Character({
				initialAttributes: {
					charisma: 1,
					constitution: -1,
					dexterity: 0,
					intelligence: 0,
					strength: 0,
					wisdom: 0,
				},
			}),
		);
		expect(description).toBe('Definição inicial de atributos: Força 0, Destreza 0, Constituição -1, Inteligência 0, Sabedoria 0 e Carisma 1.');
	});
});
