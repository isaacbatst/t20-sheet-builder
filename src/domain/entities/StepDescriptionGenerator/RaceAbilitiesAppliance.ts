import type {CharacterInterface} from '../CharacterInterface';

export class RaceAbilitiesAppliance {
	static generate(character: CharacterInterface) {
		const race = character.getRace();

		if (!race) {
			throw new Error('UNEXPECTED_CHARACTER_WITHOUT_RACE');
		}

		return `Habilidades da raça ${race.name} aplicadas.`;
	}
}
