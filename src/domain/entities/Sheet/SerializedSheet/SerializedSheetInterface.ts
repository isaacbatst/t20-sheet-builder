import {type AbilityName, type AbilityType} from '../../Ability';
import {type EquipmentName} from '../../Inventory';
import {type ModifierType} from '../../Modifier';
import {type SerializedSheetOrigin} from '../../Origin';
import {type GeneralPowerGroup, type GeneralPowerName, type OriginPowerName} from '../../Power';
import {type GrantedPowerName} from '../../Power/GrantedPower/GrantedPowerName';
import {type RaceAbilityName, type RaceName, type SerializedRace} from '../../Race';
import {type RoleAbilityName, type RoleName, type RolePowerName, type SerializedRole} from '../../Role';
import {type SkillName} from '../../Skill';
import {type LearnableSpellType, type SpellCircle, type SpellName, type SpellSchool, type SpellType} from '../../Spell';
import {type TranslatableName} from '../../Translator';
import {type Attribute, type Attributes} from '../Attributes';
import {type Proficiency} from '../Proficiency';
import {type SerializedSheetDevotion} from '../SheetDevotion';
import {type SerializedInitialEquipment} from '../SheetInventoryInterface';
import {type SerializedSheetResistencies} from '../SheetResistencesInterface';
import {type Vision} from '../Vision';

export type SerializedSheetEquipment<T extends EquipmentName = EquipmentName> = {
	name: T;
};

export type SerializedSheetOriginBenefit = {
	name: SkillName | GeneralPowerName | OriginPowerName;
};

export type SerializedSheetModifier = {
	source: TranslatableName;
	type: ModifierType;
	baseValue: number;
	appliableValue: number;
	attributeBonuses: Attribute[];
	totalAttributeBonuses: number;
};

export type SerializedSheetModifiersList = {
	modifiers: SerializedSheetModifier[];
	total: number;
};

export type SerializedSheetContextualModifiersList = SerializedSheetModifiersList & {
	maxTotal: number;
};

export type SerializedSheetPerLevelModifiersList = SerializedSheetModifiersList & {
	totalPerLevel: number;
};

export type SerializedSheetSkill = {
	attribute: Attribute;
	isTrained: boolean;
	total: number;
	trainingPoints: number;
	contextualModifiers: SerializedSheetContextualModifiersList;
	fixedModifiers: SerializedSheetModifiersList;
};

export type SerializedSheetSkills = {
	skills: Record<SkillName, SerializedSheetSkill>;
	intelligenceSkills: SkillName[];
};

export type SerializedSheetAbilityEffect = {
	description: string;
};

export type SerializedSheetAbility = {
	name: AbilityName;
	abilityType: AbilityType;
	effects: SerializedSheetAbilityEffect[];
};

export type SerializedSheetRoleAbility = {
	name: RoleAbilityName;
} & SerializedSheetAbility;

export type SerializedSheetRaceAbility = {
	name: RaceAbilityName;
} & SerializedSheetAbility;

export type SerializedSheetSpell = SerializedSheetAbility & {
	name: SpellName;
	circle: SpellCircle;
	type: SpellType;
	school: SpellSchool;
	shortDescription: string;
};

export type SerializedSheetInventoryEquipment = {
	name: EquipmentName;
	isEquipped: boolean;
};

export type SerializedSheetGeneralPower = {
	name: GeneralPowerName;
	group: GeneralPowerGroup;
} & SerializedSheetAbility;

export type SerializedSheetRolePower = {
	name: RolePowerName;
} & SerializedSheetAbility;

export type SerializedSheetOriginPower = {
	name: OriginPowerName;
} & SerializedSheetAbility;

export type SerializedSheetGrantedPower = {
	name: GrantedPowerName;
} & SerializedSheetAbility;

export type SerializedSheetDefense = {
	attribute: Attribute;
	fixedModifiers: SerializedSheetModifiersList;
	total: number;
};

/**
 * @deprecated Use "SerializedRace" instead
 */
export type SerializedSheetRace = {
	name: RaceName;
	attributeModifiers: Partial<Attributes>;
	abilities: SerializedSheetRaceAbility[];
};

/**
 * @deprecated Use "SerializedRole" instead
 */
export type SerializedSheetRole = {
	initialLifePoints: number;
	lifePointsPerLevel: number;
	manaPerLevel: number;
	mandatorySkills: SkillName[];
	selectSkillGroups: Array<{skills: SkillName[]; amount: number}>;
	proficiencies: Proficiency[];
	name: RoleName;
	startsWithArmor: boolean;
	totalInitialSkills: number;
	abilities: SerializedSheetRoleAbility[];
};

export type SerializedSheetPoints = {
	max: number;
	fixedModifiers: SerializedSheetModifiersList;
	perLevelModifiers: SerializedSheetPerLevelModifiersList;
};

export type SerializedSheetLearnedCircles = Record<LearnableSpellType, SpellCircle[]>;

export type SerializedSheetBuildStep = {
	action: {
		type: string;
		description: string;
	};
};

export type SerializedSheetInterface = {
	attributes: Attributes;
	initialAttributes: Attributes;
	tormentaPowersAttribute: Attribute;
	buildSteps: SerializedSheetBuildStep[];
	level: number;
	lifePoints: SerializedSheetPoints;
	manaPoints: SerializedSheetPoints;
	skills: SerializedSheetSkills;
	learnedCircles:	SerializedSheetLearnedCircles;
	spells: SerializedSheetSpell[];
	money: number;
	equipments: SerializedSheetInventoryEquipment[];
	initialEquipment: SerializedInitialEquipment | undefined;
	generalPowers: SerializedSheetGeneralPower[];
	rolePowers: SerializedSheetRolePower[];
	originPowers: SerializedSheetOriginPower[];
	grantedPowers: SerializedSheetGrantedPower[];
	grantedPowersCount: number;
	defense: SerializedSheetDefense;
	vision: Vision;
	race: SerializedRace | undefined;
	role: SerializedRole | undefined;
	origin: SerializedSheetOrigin | undefined;
	proficiencies: Proficiency[];
	displacement: number;
	devotion: SerializedSheetDevotion;
	resistencies: SerializedSheetResistencies;
};

