import {Capitalizer} from './Capitalizer';
import {type DamageType} from './Damage/DamageType';
import {type DeityName} from './Devotion/DeityName';
import type {EquipmentName} from './Inventory/Equipment/EquipmentName';
import type {OriginName} from './Origin/OriginName';
import type {PowerName} from './Power/PowerName';
import type {RaceAbilityName} from './Race/RaceAbilityName';
import type {RaceName} from './Race/RaceName';
import type {ArcanistPathName} from './Role';
import type {RoleAbilityName} from './Role/RoleAbilityName';
import type {RoleName} from './Role/RoleName';
import type {Attribute} from './Sheet/Attributes';
import type {Proficiency} from './Sheet/Proficiency';
import type {ResistanceName} from './Resistance/ResistanceName';
import type {Vision} from './Sheet/Vision';
import {type SizeName} from './Size';
import type {SkillName} from './Skill/SkillName';
import {type SpellSchool, type SpellType} from './Spell';
import {SpellCircle} from './Spell/SpellCircle';
import type {SpellName} from './Spell/SpellName';
import {type EquipmentImprovementName} from './Inventory/Equipment/EquipmentImprovement/EquipmentImprovementName';

export type TranslatableName = Attribute
| RaceAbilityName | SkillName | PowerName | RaceName | Proficiency
| Vision | RoleAbilityName | SpellName | SpellCircle | RoleName | OriginName
| EquipmentName | ArcanistPathName | DamageType | SpellSchool | SizeName | DeityName
| ResistanceName | EquipmentImprovementName
| 'default';

export class Translator {
	static getAttributeTranslation(attribute: Attribute, capitalized = true) {
		const translatedAttribute = Translator.attributesTranslation[attribute];

		if (capitalized) {
			return Capitalizer.capitalize(translatedAttribute);
		}

		return translatedAttribute;
	}

	static getRaceAbilityTranslation(ability: RaceAbilityName) {
		return Translator.raceAbilitiesTranslation[ability];
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

	static getDamageTypeTranslation(damageType: DamageType) {
		return Translator.damageTypesTranslation[damageType];
	}

	static getSpellTypeTranslation(spellType: SpellType) {
		return Translator.spellTypesTranslation[spellType];
	}

	static getSpellSchoolTranslation(school: SpellSchool) {
		return Translator.spellSchoolsTranslation[school];
	}

	static getSizeTranslation(size: SizeName) {
		return Translator.sizesTranslation[size];
	}

	static getResistanceTranslation(resistance: ResistanceName) {
		return Translator.resistancesTranslation[resistance];
	}

	static getTranslation(string: TranslatableName) {
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

	private static readonly raceAbilitiesTranslation: Record<RaceAbilityName, string> = {
		rockKnownledge: 'Conhecimento das Rochas',
		versatile: 'Versátil',
		slowAndAlways: 'Devagar e Sempre',
		hardAsRock: 'Duro como pedra',
		heredrimmTradition: 'Tradição Heredrimm',
		allihannaArmor: 'Armadura de Allihanna',
		plantsFriend: 'Amiga das Plantas',
		wildEmpathy: 'Empatia Selvagem',
		elvenSenses: 'Sentidos Élficos',
		gloriennGrace: 'Graça de Glórienn',
		magicBlood: 'Sangue Mágico',
		ingenious: 'Engenhoso',
		jointer: 'Espelunqueiro',
		slenderPlage: 'Peste Esguia',
		streetRat: 'Rato das Ruas	',
		deformity: 'Deformidade',
		sonOfTormenta: 'Filho da Tormenta',
		fearOfHeights: 'Medo de Altura',
		hornes: 'Chifres',
		nose: 'Faro',
		stiffLeather: 'Couro Rígido',
		desires: 'Desejos',
		elementalResistance: 'Resistência Elemental',
		mysticTattoo: 'Tatuagem Mística',
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
		acting: 'Atuação',
		stealth: 'Furtividade',
		gambling: 'Jogatina',
		piloting: 'Pilotagem',
		thievery: 'Ladinagem',
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
		shell: 'Carapaça',
		analyticMind: 'Mente Analítica',
		emptyMind: 'Mente Vazia',
		linWuTradition: 'Tradição de Lin-Wu',
	};

	private static readonly visionsTranslation: Record<Vision, string> = {
		default: 'Visão padrão',
		penumbra: 'Visão na penumbra',
		dark: 'Visão no escuro',
	};

	private static readonly racesTranslation: Record<RaceName, string> = {
		dwarf: 'Anão',
		human: 'Humano',
		dahllan: 'Dahllan',
		elf: 'Elfo',
		goblin: 'Goblin',
		lefeu: 'Lefeu',
		minotaur: 'Minotauro',
		qareen: 'Qareen',
	};

	private static readonly rolesTranslation: Record<RoleName, string> = {
		warrior: 'Guerreiro',
		arcanist: 'Arcanista',
		barbarian: 'Bárbaro',
		buccaneer: 'Bucaneiro',
		bard: 'Bardo',
		ranger: 'Caçador',
		knight: 'Cavaleiro',
		cleric: 'Clérigo',
		druid: 'Druida',
		inventor: 'Inventor',
		rogue: 'Ladino',
		fighter: 'Lutador',
		noble: 'Nobre',
		paladin: 'Paladino',
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
		arcanistSpells: 'Magias (Arcanista)',
		arcanistSupernaturalLineage: 'Linhagem Sobrenatural',
		rage: 'Fúria',
		audacity: 'Audácia',
		bardSpells: 'Magias (Bardo)',
		preyMark: 'Marca da Presa',
		inspiration: 'Inspiração',
		tracker: 'Rastreador',
		honourCode: 'Código de Honra',
		bulwark: 'Baluarte',
		clericFaithfulDevote: 'Devoto Fiel (Clérigo)',
		clericSpells: 'Magias do Clérigo',
		druidFaithfulDevote: 'Devoto Fiel (Druida)',
		wildEmpathy: 'Empatia Selvagem',
		druidSpells: 'Magias (Druida)',
		ingenuity: 'Engenhosidade',
		prototype: 'Protótipo',
		sneakAttack: 'Ataque Furtivo',
		specialist: 'Especialista',
	};

	private static readonly spellTypesTranslation: Record<SpellType, string> = {
		arcane: 'Arcana',
		divine: 'Divina',
		universal: 'Universal',
	};

	private static readonly spellsTranslation: Record<SpellName, string> = {
		arcaneArmor: 'Armadura Arcana',
		illusoryDisguise: 'Disfarce Ilusório',
		mentalDagger: 'Adaga Mental',
		flamesExplosion: 'Explosão de Chamas',
		controlPlants: 'Controlar Plantas',
		cureWounds: 'Curar Ferimentos',
		divineProtection: 'Proteção Divina',
		faithShield: 'Escudo da Fé',
		magicWeapon: 'Arma Mágica',
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
		horns: 'Chifres',
		shortSword: 'Espada Curta',
		spear: 'Lança',
		mace: 'Maça',
		staffStick: 'Bordão',
		pike: 'Pique',
		baton: 'Tacape',
		assegai: 'Azagaia',
		lightCrossbow: 'Besta Leve',
		sling: 'Funda',
		shortbow: 'Arco Curto',
		hatchet: 'Machadinha',
		scimitar: 'Cimitarra',
		foil: 'Florete',
		battleAxe: 'Machado de Batalha',
		flail: 'Mangual',
		warHammer: 'Martelo de Guerra',
		pickaxe: 'Picareta',
		trident: 'Tridente',
		halberd: 'Alabarda',
		cutlass: 'Alfange',
		mountedSpear: 'Lança Montada',
		handAndaHalfSword: 'Montante',
		longBow: 'Arco Longo',
		heavyCrossbow: 'Besta Pesada',
		warAxe: 'Machado de Guerra',
		whip: 'Chicote',
		bastardSword: 'Espada Bastarda',
		katana: 'Katana',
		dwarfAxe: 'Machado Anão',
		chainofThorns: 'Corrente de Espinhos',
		tauricAxe: 'Machado Táurico',
		pistol: 'Pistola',
		musket: 'Mosquete',
		heavyShield: 'Escudo Pesado',
		lightShield: 'Escudo Leve',
		acid: 'Ácido',
		bomb: 'Bomba',
		loveElixir: 'Elixir do Amor',
		sickle: 'Foice',
	};

	private static readonly arcanistPathsTranslation: Record<ArcanistPathName, string> = {
		mage: 'Mago',
		sorcerer: 'Feiticeiro',
		wizard: 'Bruxo',
	};

	private static readonly damageTypesTranslation: Record<DamageType, string> = {
		acid: 'Ácido',
		cold: 'Frio',
		cutting: 'Cortante',
		darkness: 'Trevas',
		eletricity: 'Eletricidade',
		essence: 'Essência',
		fire: 'Fogo',
		impact: 'Impacto',
		light: 'Luz',
		piercing: 'Perfurante',
		psychic: 'Mental',
	};

	private static readonly spellSchoolsTranslation: Record<SpellSchool, string> = {
		abjuration: 'Abjuração',
		divination: 'Divinação',
		enchantment: 'Encantamento',
		evocation: 'Evocação',
		illusion: 'Ilusão',
		necromancy: 'Necromancia',
		summoning: 'Convocação',
		transmutation: 'Transmutação',
	};

	private static readonly sizesTranslation: Record<SizeName, string> = {
		colossal: 'Colossal',
		huge: 'Enorme',
		large: 'Grande',
		medium: 'Médio',
		small: 'Pequeno',
		tiny: 'Minúsculo',
	};

	private static readonly deitiesTranslation: Record<DeityName, string> = {
		aharadak: 'Aharadak',
		allihanna: 'Allihanna',
		azgher: 'Azgher',
		kallyadranoch: 'Kallyadranoch',
		khalmyr: 'Khalmyr',
		lena: 'Lena',
		linwuh: 'Lin-Wu',
		marah: 'Marah',
		megalokk: 'Megalokk',
		nimb: 'Nimb',
		sszzzaas: 'Sszzaas',
		tannatoh: 'Tanna-Toh',
		tenebra: 'Tenebra',
		thwor: 'Thwor',
		thyatis: 'Thyatis',
		valkaria: 'Valkaria',
	};

	private static readonly resistancesTranslation: Record<ResistanceName, string> = {
		tormenta: 'Tormenta',
		lefeu: 'Lefeu',
		acid: 'Ácido',
		cold: 'Frio',
		darkness: 'Trevas',
		electricity: 'Eletricidade',
		fire: 'Fogo',
		light: 'Luz',
	};

	private static readonly equipmentImprovementsTranslation: Record<EquipmentImprovementName, string> = {
		accurate: 'Certeira',
		cruel: 'Cruel',
		fit: 'Ajustada',
		reinforced: 'Reforçada',
	};

	private static readonly translation: Record<TranslatableName, string> = {
		...Translator.attributesTranslation,
		...Translator.raceAbilitiesTranslation,
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
		...Translator.damageTypesTranslation,
		...Translator.spellTypesTranslation,
		...Translator.spellSchoolsTranslation,
		...Translator.sizesTranslation,
		...Translator.deitiesTranslation,
		...Translator.resistancesTranslation,
		...Translator.equipmentImprovementsTranslation,
		default: 'Padrão',
	};
}
