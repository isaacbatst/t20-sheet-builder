import type {Attributes} from './Attributes';
import type {SheetInterface} from './SheetInterface';
import type {Modifier} from './ModifierOthers';
import type {PowerInterface} from './Power/Power';
import type {RaceAbilityInterface} from './RaceAbility/RaceAbility';
import type {RaceInterface} from './RaceInterface';
import type {SkillNameEnum} from './Skill/SkillName';
import type {Translatable} from './Translator';
import type {Vision} from './Vision';

type ActionTypesToHandlers = {
	setInitialAttributes(payload: {attributes: Attributes}): void;
	addOtherModifierToSkill(payload: Modifier & {skill: SkillNameEnum}): void;
	addOtherModifierToDefense(payload: Modifier): void;
	chooseRace(payload: {race: RaceInterface}): void;
	trainSkill(payload: {name: SkillNameEnum; source: Translatable}): void;
	changeVision(payload: {vision: Vision; source: Translatable}): void;
	applyRaceModifiers(payload: {modifiers: Partial<Attributes>; updatedAttributes: Partial<Attributes>}): void;
	applyRaceAbility(payload: {ability: RaceAbilityInterface}): void;
	pickPower(payload: {power: PowerInterface; source: Translatable}): void;
};

export type ActionType = keyof ActionTypesToHandlers;
export type ActionPayload<T extends ActionType> = Parameters<ActionTypesToHandlers[T]>[0];
export type ActionInterface<T extends ActionType> = {
	type: T;
	payload: ActionPayload<T>;
};
export type CharacterActionHandlers = {
	[Property in keyof ActionTypesToHandlers]: (payload: ActionPayload<Property>) => void
};
export type CharacterActionDescriptionGenerators = {
	[Property in keyof ActionTypesToHandlers]: (character: SheetInterface, action: ActionInterface<Property>) => string
};
