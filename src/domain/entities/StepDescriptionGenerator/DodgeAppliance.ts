import type {CharacterInterface} from '../CharacterInterface';

export class DodgeAppliance {
	static generate(character: CharacterInterface) {
		const defense = character.getDefenseTotal();
		const reflexes = character.getSkills().reflexes.getTotal();
		return `Esquiva: você recebe +2 na defesa (${defense}) e reflexos (${reflexes}).`;
	}
}
