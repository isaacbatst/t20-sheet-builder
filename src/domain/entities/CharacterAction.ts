import type {Attributes} from './Attributes';
import type {CharacterInterface} from './CharacterInterface';
import type {Modifier} from './ModifierOthers';
import type {RaceAbilityNameEnum} from './RaceAbility/RaceAbilityName';
import type {RaceInterface} from './RaceInterface';
import type {SkillNameEnum} from './Skill/SkillName';
import type {Translatable} from './Translator';
import type {Vision} from './Vision';

type CharacterActionsToHandlers = {
	setInitialAttributes(payload: {attributes: Attributes}): void;
	addOtherModifierToSkill(payload: Modifier & {skill: SkillNameEnum}): void;
	addOtherModifierToDefense(payload: Modifier): void;
	chooseRace(payload: {race: RaceInterface}): void;
	trainSkill(payload: {name: SkillNameEnum}): void;
	changeVision(payload: {vision: Vision; source: Translatable}): void;
	applyRaceModifiers(payload: {modifiers: Partial<Attributes>; updatedAttributes: Partial<Attributes>}): void;
	applyAbility(payload: {name: RaceAbilityNameEnum}): void;
};

export type CharacterAction = keyof CharacterActionsToHandlers;
export type CharacterActionPayload<T extends CharacterAction> = Parameters<CharacterActionsToHandlers[T]>[0];
export type Action<T extends CharacterAction> = {
	type: T;
	payload: CharacterActionPayload<T>;
};
export type CharacterActionHandlers = {
	[Property in keyof CharacterActionsToHandlers]: (payload: CharacterActionPayload<Property>) => void
};
export type CharacterActionDescriptionGenerators = {
	[Property in keyof CharacterActionsToHandlers]: (character: CharacterInterface, action: Action<Property>) => string
};
