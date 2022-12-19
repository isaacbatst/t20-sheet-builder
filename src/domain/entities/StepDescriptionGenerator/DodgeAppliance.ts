import type {CharacterInterface} from '../CharacterInterface';

export class DodgeAppliance {
	static generate(character: CharacterInterface) {
		const defense = character.getDefenseTotal();
		const reflexos = character.getSkills().reflexos.getTotal();
		return `Esquiva: você recebe +2 na defesa (${defense}) e reflexos (${reflexos}).`;
	}
}
