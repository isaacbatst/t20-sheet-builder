import type {Attributes} from './Attributes';
import type {CharacterInterface, OtherModifierCondition} from './CharacterInterface';
import type {AttributeModifier} from './Race/Race';
import type {RaceAbilityNameEnum} from './RaceAbility/RaceAbilityName';
import type {RaceInterface} from './RaceInterface';
import type {SkillNameEnum} from './Skill/SkillName';
import type {Vision} from './Vision';

type CharacterActionsToHandlers = {
	setInitialAttributes(payload: {attributes: Attributes}): void;
	addOtherModifierToSkill(payload: {source: string; value: number; skill: SkillNameEnum; condition?: OtherModifierCondition}): void;
	addOtherModifierToDefense(payload: {source: string; value: number; condition?: OtherModifierCondition}): void;
	chooseRace(payload: {race: RaceInterface}): void;
	trainSkill(payload: {name: string}): void;
	changeVision(payload: {vision: Vision}): void;
	applyRaceModifiers(payload: {modifiers: AttributeModifier[]; updatedAttributes: Attributes}): void;
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
