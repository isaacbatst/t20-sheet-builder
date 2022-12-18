import type {Attribute} from './Attributes';

export class AttributeTranslator {
	static attributeToString: Record<Attribute, string> = {
		charisma: 'Carisma',
		constitution: 'Constituição',
		dexterity: 'Destreza',
		intelligence: 'Inteligência',
		strength: 'Força',
		wisdom: 'Sabedoria',
	};
}
