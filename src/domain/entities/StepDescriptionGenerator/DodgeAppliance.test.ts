import {CharacterFake} from '../CharacterFake';
import {DodgeAppliance} from './DodgeAppliance';

describe('InitialAttributesDefinition', () => {
	it('should generate description', () => {
		const description = DodgeAppliance.generate(new CharacterFake());

		expect(description).toBe('Esquiva: você recebe +2 na defesa (10) e reflexos (0).');
	});
});
