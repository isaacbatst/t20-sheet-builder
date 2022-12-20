import type {Action, CharacterInterface} from '../CharacterInterface';

export class InitialAttributesDefinition {
	static generate(character: CharacterInterface, action: Action<'setInitialAttributes'>): string {
		const attributes = character.getAttributes();
		return `Definição inicial de atributos: Força ${attributes.strength}, Destreza ${attributes.dexterity}, Constituição ${attributes.constitution}, Inteligência ${attributes.intelligence}, Sabedoria ${attributes.wisdom} e Carisma ${attributes.charisma}.`;
	}
}
