import type {Attribute} from './Attributes';
import type {GeneralPowerNameEnum} from './Power/GeneralPowerName';
import type {RaceNameEnum} from './Race/RaceName';
import type {RaceAbilityNameEnum} from './RaceAbility/RaceAbilityName';
import type {SkillNameEnum} from './Skill/SkillName';
import {StringHelper} from './StringHelper';
import type {Vision} from './Vision';

export type Translatable = Attribute | RaceAbilityNameEnum | SkillNameEnum | GeneralPowerNameEnum | RaceNameEnum | Vision;

export class Translator {
	static getTranslatedAttribute(attribute: Attribute, capitalized = true) {
		const translatedAttribute = Translator.attributesTranslation[attribute];

		if (capitalized) {
			return StringHelper.capitalize(translatedAttribute);
		}

		return translatedAttribute;
	}

	static getTranslatedAbility(ability: RaceAbilityNameEnum) {
		return Translator.abilitiesTranslation[ability];
	}

	static getTranslatedSkill(skill: SkillNameEnum) {
		return Translator.skillsTranslation[skill];
	}

	static getTranslatedVision(vision: Vision) {
		return Translator.visionsTranslation[vision];
	}

	static getTranslatedRace(race: RaceNameEnum) {
		return Translator.racesTranslation[race];
	}

	static getTranslation(string: Translatable) {
		return Translator.translation[string];
	}

	private static readonly attributesTranslation: Record<Attribute, string> = {
		charisma: 'carisma',
		constitution: 'constituição',
		dexterity: 'destreza',
		intelligence: 'inteligência',
		strength: 'força',
		wisdom: 'sabedoria',
	};

	private static readonly abilitiesTranslation: Record<RaceAbilityNameEnum, string> = {
		rockKnownledge: 'Conhecimento das Rochas',
		versatile: 'Versátil',
	};

	private static readonly skillsTranslation: Record<SkillNameEnum, string> = {
		acrobatics: 'Acrobacia',
		animalHandling: 'Adestramento',
		fight: 'Luta',
		perception: 'Percepção',
		reflexes: 'Reflexos',
		survival: 'Sobrevivência',
	};

	private static readonly generalPowersTranslation: Record<GeneralPowerNameEnum, string> = {
		dodge: 'Esquiva',
		swordAndShieldStyle: 'Esttilo Espada e Escudo',
		twoHandsStyle: 'Estilo de Duas Mãos',
	};

	private static readonly visionsTranslation: Record<Vision, string> = {
		default: 'Visão padrão',
		penumbra: 'Visão na penumbra',
		dark: 'Visão no escuro',
	};

	private static readonly racesTranslation: Record<RaceNameEnum, string> = {
		dwarf: 'Anão',
		human: 'Humano',
	};

	private static readonly translation: Record<Translatable, string> = {
		...Translator.attributesTranslation,
		...Translator.abilitiesTranslation,
		...Translator.skillsTranslation,
		...Translator.generalPowersTranslation,
		...Translator.visionsTranslation,
		...Translator.racesTranslation,
	};
}
