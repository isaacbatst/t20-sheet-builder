import {RaceAttributeModifiersAppliance} from './RaceAttributeModifiersAppliance';

describe('RaceAttributeModifiersAppliance', () => {
	it('should generate description', () => {
		const description = RaceAttributeModifiersAppliance.generate({
			getRace() {
				return {
					attributeModifiers: [
						{attribute: 'charisma', modifier: 2},
						{attribute: 'dexterity', modifier: -2},
					],
				};
			},
		});

		expect(description).toBe('Aplicação dos modificadores de atributo da raça: +2 Carisma e -2 Destreza.');
	});
});
