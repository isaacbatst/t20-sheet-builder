import type {Attributes} from './Attributes';
import type {Action, CharacterAction} from './CharacterAction';
import type {Context} from './Context';
import type {InGameContext} from './InGameContext';
import type {RaceInterface} from './RaceInterface';
import type {Skill} from './Skill/Skill';
import type {SkillNameEnum} from './Skill/SkillName';
import type {Vision} from './Vision';

export type SkilledCharacter = {
	getTrainedSkills(): SkillNameEnum[];
	getSkills(): Record<SkillNameEnum, Skill>;
	getSkillTotal(skill: SkillNameEnum): number;
};

export type LeveledCharacter = {
	getLevel(): number;
};

export type AttributesCharacter = {
	getAttributes(): Attributes;
};

export type OtherModifierCondition = (context: InGameContext) => boolean;

export type CharacterDispatch = <T extends CharacterAction>(action: Action<T>) => void;

export type ProgressingCharacter = {
	dispatch: CharacterDispatch;
};

export type RaceCharacter = {
	getRace(): RaceInterface | undefined;
};

export type DefensibleCharacter = {
	getDefenseTotal(): number;
};

export type VisionCharacter = {
	getVision(): Vision;
};

export type Location = {isUnderground: boolean};

export type ContextCharacter = {
	getContext(): Context;
};

export type CharacterInterface = SkilledCharacter
& LeveledCharacter
& AttributesCharacter
& ProgressingCharacter
& RaceCharacter
& DefensibleCharacter
& VisionCharacter
& ContextCharacter;
