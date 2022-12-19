import type {Attributes} from '../Attributes';

export class InitialAttributesDefinition {
	static generate(character: {getAttributes(): Attributes}): string {
		const attributes = character.getAttributes();
		return `Definição inicial de atributos: Força ${attributes.strength}, Destreza ${attributes.dexterity}, Constituição ${attributes.constitution}, Inteligência ${attributes.intelligence}, Sabedoria ${attributes.wisdom} e Carisma ${attributes.charisma}.`;
	}
}
