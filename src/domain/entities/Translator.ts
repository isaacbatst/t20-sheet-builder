import type {Attribute} from './Sheet/Attributes';
import type {OriginName} from './Origin/OriginName';
import type {PowerName} from './Power/PowerName';
import type {Proficiency} from './Sheet/Proficiency';
import type {RaceName} from './Race/RaceName';
import type {RaceAbilityName} from './Race/RaceAbilityName';
import type {RoleAbilityName} from './Role/RoleAbilityName';
import type {RoleName} from './Role/RoleName';
import type {SkillName} from './Skill/SkillName';
import {SpellCircle} from './Spell/SpellCircle';
import type {SpellName} from './Spell/SpellName';
import {StringHelper} from './StringHelper';
import type {Vision} from './Sheet/Vision';
import type {EquipmentName} from './Inventory/Equipment/EquipmentName';
import type {ArcanistPathName} from './Role';

export type Translatable = Attribute
| RaceAbilityName | SkillName | PowerName | RaceName | Proficiency
| Vision | RoleAbilityName | SpellName | SpellCircle | RoleName | OriginName
| EquipmentName | ArcanistPathName | 'default';

export class Translator {
	static getAttributeTranslation(attribute: Attribute, capitalized = true) {
		const translatedAttribute = Translator.attributesTranslation[attribute];

		if (capitalized) {
			return StringHelper.capitalize(translatedAttribute);
		}

		return translatedAttribute;
	}

	static getAbilityTranslation(ability: RaceAbilityName) {
		return Translator.abilitiesTranslation[ability];
	}

	static getSkillTranslation(skill: SkillName) {
		return Translator.skillsTranslation[skill];
	}

	static getVisionTranslation(vision: Vision) {
		return Translator.visionsTranslation[vision];
	}

	static getRaceTranslation(race: RaceName) {
		return Translator.racesTranslation[race];
	}

	static getRoleTranslation(role: RoleName) {
		return Translator.rolesTranslation[role];
	}

	static getRoleAbilityTranslation(role: RoleAbilityName) {
		return Translator.roleAbilitiesTranslation[role];
	}

	static getPowerTranslation(power: PowerName) {
		return Translator.powersTranslation[power];
	}

	static getProficiencyTranslation(proficiency: Proficiency) {
		return Translator.proficienciesTranslation[proficiency];
	}

	static getSpellTranslation(spell: SpellName) {
		return Translator.spellsTranslation[spell];
	}

	static getSpellCircleTranslation(circle: SpellCircle) {
		return Translator.spellCirclesTranslation[circle];
	}

	static getEquipmentTranslation(equipment: EquipmentName) {
		return Translator.equipmentsTranslation[equipment];
	}

	static getOriginTranslation(origin: OriginName) {
		return Translator.originsTranslation[origin];
	}

	static getTranslation(string: Translatable) {
		return Translator.translation[string];
	}

	private static readonly attributesTranslation: Record<Attribute, string> = {
		charisma: 'carisma',
		constitution: 'constitui????o',
		dexterity: 'destreza',
		intelligence: 'intelig??ncia',
		strength: 'for??a',
		wisdom: 'sabedoria',
	};

	private static readonly abilitiesTranslation: Record<RaceAbilityName, string> = {
		rockKnownledge: 'Conhecimento das Rochas',
		versatile: 'Vers??til',
		slowAndAlways: 'Devagar e Sempre',
		hardAsRock: 'Duro como pedra',
	};

	private static readonly skillsTranslation: Record<SkillName, string> = {
		acrobatics: 'Acrobacia',
		animalHandling: 'Adestramento',
		fight: 'Luta',
		perception: 'Percep????o',
		reflexes: 'Reflexos',
		survival: 'Sobreviv??ncia',
		aim: 'Pontaria',
		animalRide: 'Cavalgar',
		athletics: 'Atletismo',
		craft: 'Of??cio',
		fortitude: 'Fortitude',
		initiative: 'Iniciativa',
		intimidation: 'Intimida????o',
		war: 'Guerra',
		cheat: 'Engana????o',
		diplomacy: 'Diplomacia',
		intuition: 'Intui????o',
		investigation: 'Investiga????o',
		knowledge: 'Conhecimento',
		mysticism: 'Misticismo',
		nobility: 'Nobreza',
		will: 'Vontade',
		cure: 'Cura',
		religion: 'Religi??o',
	};

	private static readonly powersTranslation: Record<PowerName, string> = {
		dodge: 'Esquiva',
		swordAndShieldStyle: 'Esttilo Espada e Escudo',
		twoHandsStyle: 'Estilo de Duas M??os',
		archer: 'Arqueiro',
		medicine: 'Medicina',
		ironWill: 'Vontade de Ferro',
		churchMember: 'Membro da Igreja',
		specialFriend: 'Amigo Especial',
	};

	private static readonly visionsTranslation: Record<Vision, string> = {
		default: 'Vis??o padr??o',
		penumbra: 'Vis??o na penumbra',
		dark: 'Vis??o no escuro',
	};

	private static readonly racesTranslation: Record<RaceName, string> = {
		dwarf: 'An??o',
		human: 'Humano',
	};

	private static readonly rolesTranslation: Record<RoleName, string> = {
		warrior: 'Guerreiro',
		arcanist: 'Arcanista',
	};

	private static readonly proficienciesTranslation: Record<Proficiency, string> = {
		exotic: 'armas ex??ticas',
		fire: 'armas de fogo',
		heavyArmor: 'armaduras pesadas',
		lightArmor: 'armaduras leves',
		martial: 'armas marciais',
		shield: 'escudos',
		simple: 'armas simples',
	};

	private static readonly roleAbilitiesTranslation: Record<RoleAbilityName, string> = {
		specialAttack: 'Ataque Especial',
		warriorPower: 'Poder de Guerreiro',
		arcanistPath: 'Caminho do Arcanista',
		arcanistSpells: 'Magias do Arcanista',
	};

	private static readonly spellsTranslation: Record<SpellName, string> = {
		arcaneArmor: 'Armadura Arcana',
		illusoryDisguise: 'Disfarce Ilus??rio',
		mentalDagger: 'Adaga Mental',
		flamesExplosion: 'Explos??o de Chamas',
	};

	private static readonly spellCirclesTranslation: Record<SpellCircle, string> = {
		[SpellCircle.first]: 'primeiro',
		[SpellCircle.second]: 'segundo',
	};

	private static readonly originsTranslation: Record<OriginName, string> = {
		acolyte: 'Ac??lito',
		animalsFriend: 'Amigo dos Animais',
	};

	private static readonly equipmentsTranslation: Record<EquipmentName, string> = {
		horse: 'Cavalo',
		hound: 'C??o de Ca??a',
		pony: 'P??nei',
		priestCostume: 'Trajes de Padre',
		sacredSymbol: 'S??mbolo Sagrado',
		trobo: 'Trobo',
		backpack: 'Mochila',
		sleepingBag: 'Saco de Dormir',
		travelerCostume: 'Traje de Viajante',
		dagger: 'Adaga',
		longSword: 'Espada Longa',
		brunea: 'Brunea',
		leatherArmor: 'Armadura de Couro',
		studdedLeather: 'Couro Batido',
		wand: 'Varinha',
		staff: 'Cajado',
	};

	private static readonly arcanistPathsTranslation: Record<ArcanistPathName, string> = {
		mage: 'Mago',
		sorcerer: 'Feiticeiro',
		wizard: 'Bruxo',
	};

	private static readonly translation: Record<Translatable, string> = {
		...Translator.attributesTranslation,
		...Translator.abilitiesTranslation,
		...Translator.skillsTranslation,
		...Translator.powersTranslation,
		...Translator.visionsTranslation,
		...Translator.racesTranslation,
		...Translator.rolesTranslation,
		...Translator.proficienciesTranslation,
		...Translator.roleAbilitiesTranslation,
		...Translator.spellsTranslation,
		...Translator.spellCirclesTranslation,
		...Translator.originsTranslation,
		...Translator.equipmentsTranslation,
		...Translator.arcanistPathsTranslation,
		default: 'Padr??o',
	};
}
