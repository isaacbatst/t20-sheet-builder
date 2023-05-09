import type {Equipment} from '../Inventory/Equipment/Equipment';
import type {Armor} from '../Inventory/Equipment/Weapon/DefensiveWeapon/Armor/Armor';
import type {MartialWeapon} from '../Inventory/Equipment/Weapon/OffensiveWeapon/MartialWeapon/MartialWeapon';
import type {SimpleWeapon} from '../Inventory/Equipment/Weapon/OffensiveWeapon/SimpleWeapon/SimpleWeapon';
import type {ContextualModifierInterface} from '../Modifier/ContextualModifier/ContextualModifierInterface';
import type {FixedModifierInterface} from '../Modifier/FixedModifier/FixedModifier';
import {type PerLevelModifierInterface} from '../Modifier/PerLevelModifier/PerLevelModifierInterface';
import type {OriginInterface} from '../Origin/Origin';
import type {GeneralPowerInterface} from '../Power/GeneralPower/GeneralPower';
import type {OriginPowerInterface} from '../Power/OriginPower/OriginPower';
import type {RaceAbilityInterface} from '../Race/RaceAbility';
import type {RaceInterface} from '../Race/RaceInterface';
import type {RoleAbilityInterface} from '../Role/RoleAbility';
import type {RoleInterface} from '../Role/RoleInterface';
import type {RolePowerInterface} from '../Role/RolePower';
import type {SkillName} from '../Skill/SkillName';
import type {LearnableSpellType, Spell} from '../Spell/Spell';
import type {SpellCircle} from '../Spell/SpellCircle';
import {type TranslatableName} from '../Translator';
import type {Attribute, Attributes} from './Attributes';
import type {Proficiency} from './Proficiency';
import type {SheetInterface} from './SheetInterface';
import type {Vision} from './Vision';

type ActionHandlersPayloads = {
	setInitialAttributes: {attributes: Attributes};
	chooseRace: {race: RaceInterface};
	chooseRole: {role: RoleInterface};
	chooseOrigin: {origin: OriginInterface};
	trainSkill: {skill: SkillName; source: TranslatableName};
	changeVision: {vision: Vision; source: TranslatableName};
	applyRaceModifiers: {modifiers: Partial<Attributes>};
	applyRaceAbility: {ability: RaceAbilityInterface; source: TranslatableName};
	applyRoleAbility: {ability: RoleAbilityInterface; source: TranslatableName};
	pickGeneralPower: ({power: GeneralPowerInterface; source: TranslatableName});
	pickRolePower: ({power: RolePowerInterface; source: TranslatableName});
	pickOriginPower: ({power: OriginPowerInterface; source: TranslatableName});
	changeDisplacement: {displacement: number; source: TranslatableName};
	addProficiency: {proficiency: Proficiency; source: TranslatableName};
	learnCircle: {circle: SpellCircle; type: LearnableSpellType; source: TranslatableName};
	learnSpell: {spell: Spell; source: TranslatableName};
	addContextualModifierToSkill: {modifier: ContextualModifierInterface; skill: SkillName};
	addFixedModifierToSkill: {modifier: FixedModifierInterface; skill: SkillName};
	addFixedModifierToLifePoints: {modifier: FixedModifierInterface};
	addPerLevelModifierToLifePoints: {modifier: PerLevelModifierInterface};
	addPerLevelModifierToManaPoints: {modifier: PerLevelModifierInterface};
	addFixedModifierToDefense: {modifier: FixedModifierInterface};
	trainIntelligenceSkills: {skills: SkillName[]};
	addEquipment: {equipment: Equipment; source: TranslatableName};
	addInitialEquipment: {role: RoleInterface; simpleWeapon: SimpleWeapon; martialWeapon?: MartialWeapon; armor?: Armor; money: number};
	addMoney: {quantity: number; source: TranslatableName};
	changeTormentaPowersAttribute: {attribute: Attribute; source: TranslatableName};
	decreaseAttribute: {attribute: Attribute; quantity: number; source: TranslatableName};
};

export type ActionType = keyof ActionHandlersPayloads;
export type ActionPayload<T extends ActionType> = ActionHandlersPayloads[T];
export type ActionInterface<T extends ActionType = ActionType> = {
	type: T;
	payload: ActionPayload<T>;
};

export type ActionDescriptionGenerators = {
	[Property in keyof ActionHandlersPayloads]: (sheet: SheetInterface, action: ActionInterface<Property>) => string
};
