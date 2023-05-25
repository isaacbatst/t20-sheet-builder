import {type AbilityName, type AbilityType} from '../../Ability';
import {type EquipmentName} from '../../Inventory';
import {type ModifierType} from '../../Modifier';
import {type OriginName} from '../../Origin';
import {type OriginBenefits} from '../../Origin/OriginBenefit/OriginBenefits';
import {type GeneralPowerGroup, type GeneralPowerName, type OriginPowerName} from '../../Power';
import {type RaceAbilityName, type RaceName} from '../../Race';
import {type RoleAbilityName, type RoleName, type RolePowerName} from '../../Role';
import {type SkillName} from '../../Skill';
import {type LearnableSpellType, type SpellCircle, type SpellName, type SpellSchool, type SpellType} from '../../Spell';
import {type TranslatableName} from '../../Translator';
import {type Attribute, type Attributes} from '../Attributes';
import {type Proficiency} from '../Proficiency';
import {type Vision} from '../Vision';

export type SerializedSheetEquipment = {
	name: EquipmentName;
};

export type SerializedSheetOriginBenefit = {
	name: SkillName | GeneralPowerName | OriginPowerName;
};

export type SerializedSheetOrigin = {
	name: OriginName;
	equipments: SerializedSheetEquipment[];
	chosenBenefits: SerializedSheetOriginBenefit[];
};

export type SerializedSheetModifier = {
	source: TranslatableName;
	type: ModifierType;
	baseValue: number;
	appliableValue: number;
	attributeBonuses: Attribute[];
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

export type SerializedSheetSkills = Record<SkillName, SerializedSheetSkill>;

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

export type SerializedSheetDefense = {
	attribute: Attribute;
	fixedModifiers: SerializedSheetModifiersList;
	total: number;
};

export type SerializedSheetRace = {
	name: RaceName;
	attributeModifiers: Partial<Attributes>;
	abilities: SerializedSheetRaceAbility[];
};

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
	buildSteps: SerializedSheetBuildStep[];
	level: number;
	lifePoints: SerializedSheetPoints;
	manaPoints: SerializedSheetPoints;
	origin: SerializedSheetOrigin | undefined;
	skills: SerializedSheetSkills;
	tormentaPowersAttribute: Attribute;
	learnedCircles:	SerializedSheetLearnedCircles;
	spells: SerializedSheetSpell[];
	money: number;
	equipments: SerializedSheetInventoryEquipment[];
	generalPowers: SerializedSheetGeneralPower[];
	rolePowers: SerializedSheetRolePower[];
	originPowers: SerializedSheetOriginPower[];
	defense: SerializedSheetDefense;
	vision: Vision;
	race: SerializedSheetRace | undefined;
	role: SerializedSheetRole | undefined;
	proficiencies: Proficiency[];
	displacement: number;
};

