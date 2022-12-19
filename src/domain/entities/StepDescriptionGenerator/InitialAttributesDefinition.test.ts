import {InitialAttributesDefinition} from './InitialAttributesDefinition';

describe('InitialAttributesDefinition', () => {
	it('should generate description', () => {
		const description = InitialAttributesDefinition.generate({
			getAttributes() {
				return {
					charisma: 1,
					constitution: -1,
					dexterity: 0,
					intelligence: 0,
					strength: 0,
					wisdom: 0,
				};
			},
		});

		expect(description).toBe('Definição inicial de atributos: Força 0, Destreza 0, Constituição -1, Inteligência 0, Sabedoria 0 e Carisma 1.');
	});
});
