import type {TriggeredEffectInterface} from '../Ability/TriggeredEffect';
import type {Attributes} from '../Attributes';
import type {BuildingSheetInterface} from '../BuildingSheetInterface';
import type {PerLevelModifier} from '../Modifier/PerLevelModifier';
import type {ModifierInterface} from '../ModifierList';
import type {GeneralPowerInterface} from '../Power/GeneralPower';
import type {Proficiency} from '../Proficiency';
import type {RaceAbilityInterface} from '../RaceAbility/RaceAbility';
import type {RaceInterface} from '../RaceInterface';
import type {RoleAbilityInterface} from '../Role/RoleAbility';
import type {RoleInterface} from '../Role/RoleInterface';
import type {RolePowerInterface} from '../Role/RolePower';
import type {Dispatch} from '../Sheet/SheetInterface';
import type {SkillName} from '../Skill/SkillName';
import type {Spell} from '../Spell/Spell';
import type {SpellCircle} from '../Spell/SpellCircle';
import type {Translatable} from '../Translator';
import type {Vision} from '../Vision';

type ActionTypesToHandlers = {
	setInitialAttributes(payload: {attributes: Attributes}): void;
	addOtherModifierToSkill(payload: {modifier: ModifierInterface; skill: SkillName}): void;
	addOtherModifierToDefense(payload: {modifier: ModifierInterface}): void;
	chooseRace(payload: {race: RaceInterface}): void;
	trainSkill(payload: {name: SkillName; source: Translatable}): void;
	changeVision(payload: {vision: Vision; source: Translatable}): void;
	applyRaceModifiers(payload: {modifiers: Partial<Attributes>; updatedAttributes: Partial<Attributes>}): void;
	applyRaceAbility(payload: {ability: RaceAbilityInterface; source: Translatable}): void;
	applyRoleAbility(payload: {ability: RoleAbilityInterface; source: Translatable}): void;
	pickGeneralPower(payload: ({power: GeneralPowerInterface;source: Translatable})): void;
	pickRolePower(payload: ({power: RolePowerInterface;source: Translatable})): void;
	changeDisplacement(payload: {displacement: number; source: Translatable}): void;
	addModifierToLifePoints(payload: {modifier: ModifierInterface}): void;
	chooseRole(payload: {role: RoleInterface}): void;
	addProficiency(payload: {proficiency: Proficiency; source: Translatable}): void;
	learnCircle(payload: {circle: SpellCircle; source: Translatable}): void;
	learnSpell(payload: {spell: Spell; source: Translatable}): void;
	addTriggeredEffect(payload: {effect: TriggeredEffectInterface}): void;
	addPerLevelModifierToLifePoints(payload: {modifier: PerLevelModifier}): void;
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
	[Property in keyof ActionTypesToHandlers]: (sheet: BuildingSheetInterface, action: ActionInterface<Property>) => string
};
