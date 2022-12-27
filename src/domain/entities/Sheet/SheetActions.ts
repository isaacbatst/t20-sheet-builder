import type {TriggeredEffectInterface} from '../Ability/TriggeredEffect';
import type {Attributes} from '../Attributes';
import type {ContextualModifierInterface} from '../Modifier/ContextualModifier/ContextualModifierInterface';
import type {FixedModifierInterface} from '../Modifier/FixedModifier/FixedModifier';
import type {PerLevelModifier} from '../Modifier/PerLevelModifier/PerLevelModifier';
import type {GeneralPowerInterface} from '../Power/GeneralPower';
import type {Proficiency} from '../Proficiency';
import type {RaceAbilityInterface} from '../RaceAbility/RaceAbility';
import type {RaceInterface} from '../RaceInterface';
import type {RoleAbilityInterface} from '../Role/RoleAbility';
import type {RoleInterface} from '../Role/RoleInterface';
import type {RolePowerInterface} from '../Role/RolePower';
import type {Dispatch} from '../Sheet/SheetInterface';
import type {SkillName} from '../Skill/SkillName';
import type {LearnableSpellType, Spell} from '../Spell/Spell';
import type {SpellCircle} from '../Spell/SpellCircle';
import type {Translatable} from '../Translator';
import type {Vision} from '../Vision';
import type {SheetBaseInterface} from './SheetBaseInterface';

type ActionTypesToHandlers = {
	setInitialAttributes(payload: {attributes: Attributes}): void;
	chooseRace(payload: {race: RaceInterface}): void;
	trainSkill(payload: {name: SkillName; source: Translatable}): void;
	changeVision(payload: {vision: Vision; source: Translatable}): void;
	applyRaceModifiers(payload: {modifiers: Partial<Attributes>; updatedAttributes: Partial<Attributes>}): void;
	applyRaceAbility(payload: {ability: RaceAbilityInterface; source: Translatable}): void;
	applyRoleAbility(payload: {ability: RoleAbilityInterface; source: Translatable}): void;
	pickGeneralPower(payload: ({power: GeneralPowerInterface;source: Translatable})): void;
	pickRolePower(payload: ({power: RolePowerInterface;source: Translatable})): void;
	changeDisplacement(payload: {displacement: number; source: Translatable}): void;
	chooseRole(payload: {role: RoleInterface}): void;
	addProficiency(payload: {proficiency: Proficiency; source: Translatable}): void;
	learnCircle(payload: {circle: SpellCircle; source: Translatable; type: LearnableSpellType}): void;
	learnSpell(payload: {spell: Spell; source: Translatable}): void;
	addTriggeredEffect(payload: {effect: TriggeredEffectInterface}): void;
	addContextualModifierToSkill(payload: {modifier: ContextualModifierInterface; skill: SkillName}): void;
	addFixedModifierToSkill(payload: {modifier: FixedModifierInterface; skill: SkillName}): void;
	addFixedModifierToLifePoints(payload: {modifier: FixedModifierInterface}): void;
	addPerLevelModifierToLifePoints(payload: {modifier: PerLevelModifier}): void;
	addPerLevelModifierToManaPoints(payload: {modifier: PerLevelModifier}): void;
	addFixedModifierToDefense(payload: {modifier: FixedModifierInterface}): void;
};

export type ActionType = keyof ActionTypesToHandlers;
export type ActionPayload<T extends ActionType> = Parameters<ActionTypesToHandlers[T]>[0];
export type ActionInterface<T extends ActionType = ActionType> = {
	type: T;
	payload: ActionPayload<T>;
};
export type ActionsHandler = {
	[Property in keyof ActionTypesToHandlers]: (payload: ActionPayload<Property>, dispatch: Dispatch) => void
};
export type ActionDescriptionGenerators = {
	[Property in keyof ActionTypesToHandlers]: (sheet: SheetBaseInterface, action: ActionInterface<Property>) => string
};
