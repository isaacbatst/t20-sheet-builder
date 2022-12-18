import type {Character} from '../Character';

export class InitialAttributesDefinition {
	static generate(character: Character): string {
		return `Definição inicial de atributos: Força ${character.attributes.strength}, Destreza ${character.attributes.dexterity}, Constituição ${character.attributes.constitution}, Inteligência ${character.attributes.intelligence}, Sabedoria ${character.attributes.wisdom} e Carisma ${character.attributes.charisma}.`;
	}
}
