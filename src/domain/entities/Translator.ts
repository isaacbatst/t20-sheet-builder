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
		constitution: 'constituição',
		dexterity: 'destreza',
		intelligence: 'inteligência',
		strength: 'força',
		wisdom: 'sabedoria',
	};

	private static readonly abilitiesTranslation: Record<RaceAbilityName, string> = {
		rockKnownledge: 'Conhecimento das Rochas',
		versatile: 'Versátil',
		slowAndAlways: 'Devagar e Sempre',
		hardAsRock: 'Duro como pedra',
	};

	private static readonly skillsTranslation: Record<SkillName, string> = {
		acrobatics: 'Acrobacia',
		animalHandling: 'Adestramento',
		fight: 'Luta',
		perception: 'Percepção',
		reflexes: 'Reflexos',
		survival: 'Sobrevivência',
		aim: 'Pontaria',
		animalRide: 'Cavalgar',
		athletics: 'Atletismo',
		craft: 'Ofício',
		fortitude: 'Fortitude',
		initiative: 'Iniciativa',
		intimidation: 'Intimidação',
		war: 'Guerra',
		cheat: 'Enganação',
		diplomacy: 'Diplomacia',
		intuition: 'Intuição',
		investigation: 'Investigação',
		knowledge: 'Conhecimento',
		mysticism: 'Misticismo',
		nobility: 'Nobreza',
		will: 'Vontade',
		cure: 'Cura',
		religion: 'Religião',
	};

	private static readonly powersTranslation: Record<PowerName, string> = {
		dodge: 'Esquiva',
		swordAndShieldStyle: 'Esttilo Espada e Escudo',
		twoHandsStyle: 'Estilo de Duas Mãos',
		oneWeaponStyle: 'Estilo de Uma Arma',
		archer: 'Arqueiro',
		medicine: 'Medicina',
		ironWill: 'Vontade de Ferro',
		churchMember: 'Membro da Igreja',
		specialFriend: 'Amigo Especial',
	};

	private static readonly visionsTranslation: Record<Vision, string> = {
		default: 'Visão padrão',
		penumbra: 'Visão na penumbra',
		dark: 'Visão no escuro',
	};

	private static readonly racesTranslation: Record<RaceName, string> = {
		dwarf: 'Anão',
		human: 'Humano',
	};

	private static readonly rolesTranslation: Record<RoleName, string> = {
		warrior: 'Guerreiro',
		arcanist: 'Arcanista',
	};

	private static readonly proficienciesTranslation: Record<Proficiency, string> = {
		exotic: 'armas exóticas',
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
		illusoryDisguise: 'Disfarce Ilusório',
		mentalDagger: 'Adaga Mental',
		flamesExplosion: 'Explosão de Chamas',
	};

	private static readonly spellCirclesTranslation: Record<SpellCircle, string> = {
		[SpellCircle.first]: 'primeiro',
		[SpellCircle.second]: 'segundo',
	};

	private static readonly originsTranslation: Record<OriginName, string> = {
		acolyte: 'Acólito',
		animalsFriend: 'Amigo dos Animais',
	};

	private static readonly equipmentsTranslation: Record<EquipmentName, string> = {
		horse: 'Cavalo',
		hound: 'Cão de Caça',
		pony: 'Pônei',
		priestCostume: 'Trajes de Padre',
		sacredSymbol: 'Símbolo Sagrado',
		trobo: 'Trobo',
		backpack: 'Mochila',
		sleepingBag: 'Saco de Dormir',
		travelerCostume: 'Traje de Viajante',
		dagger: 'Adaga',
		club: 'Clava',
		longSword: 'Espada Longa',
		scythe: 'Gadanho',
		brunea: 'Brunea',
		leatherArmor: 'Armadura de Couro',
		studdedLeather: 'Couro Batido',
		chainMail: 'Cota de Malha',
		fullPlate: 'Armadura Completa',
		staff: 'Cajado',
		wand: 'Varinha',
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
		default: 'Padrão',
	};
}
