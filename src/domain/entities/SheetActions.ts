import type {Attributes} from './Attributes';
import type {ModifierInterface} from './ModifierList';
import type {PowerInterface} from './Power/Power';
import type {RaceAbilityInterface} from './RaceAbility/RaceAbility';
import type {RaceInterface} from './RaceInterface';
import type {RoleInterface} from './Role/RoleInterface';
import type {BuildingSheetInterface} from './BuildingSheetInterface';
import type {SkillName} from './Skill/SkillName';
import type {Translatable} from './Translator';
import type {Vision} from './Vision';
import type {Proficiency} from './Proficiency';

type ActionTypesToHandlers = {
	setInitialAttributes(payload: {attributes: Attributes}): void;
	addOtherModifierToSkill(payload: {modifier: ModifierInterface; skill: SkillName}): void;
	addOtherModifierToDefense(payload: {modifier: ModifierInterface}): void;
	chooseRace(payload: {race: RaceInterface}): void;
	trainSkill(payload: {name: SkillName; source: Translatable}): void;
	changeVision(payload: {vision: Vision; source: Translatable}): void;
	applyRaceModifiers(payload: {modifiers: Partial<Attributes>; updatedAttributes: Partial<Attributes>}): void;
	applyRaceAbility(payload: {ability: RaceAbilityInterface}): void;
	pickPower(payload: {power: PowerInterface; source: Translatable}): void;
	changeDisplacement(payload: {displacement: number; source: Translatable}): void;
	addModifierToLifePoints(payload: {modifier: ModifierInterface}): void;
	chooseRole(payload: {role: RoleInterface}): void;
	addProficiency(payload: {proficiency: Proficiency; source: Translatable}): void;
};

export type ActionType = keyof ActionTypesToHandlers;
export type ActionPayload<T extends ActionType> = Parameters<ActionTypesToHandlers[T]>[0];
export type ActionInterface<T extends ActionType> = {
	type: T;
	payload: ActionPayload<T>;
};
export type ActionHandlers = {
	[Property in keyof ActionTypesToHandlers]: (payload: ActionPayload<Property>) => void
};
export type ActionDescriptionGenerators = {
	[Property in keyof ActionTypesToHandlers]: (sheet: BuildingSheetInterface, buildStep: ActionInterface<Property>) => string
};
