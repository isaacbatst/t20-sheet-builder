import type {Attributes} from '../Attributes';

export class InitialAttributesDefinition {
	static generate(character: {attributes: Attributes}): string {
		return `Definição inicial de atributos: Força ${character.attributes.strength}, Destreza ${character.attributes.dexterity}, Constituição ${character.attributes.constitution}, Inteligência ${character.attributes.intelligence}, Sabedoria ${character.attributes.wisdom} e Carisma ${character.attributes.charisma}.`;
	}
}
