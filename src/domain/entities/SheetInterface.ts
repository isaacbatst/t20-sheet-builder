import type {Attributes} from './Attributes';
import type {ActionInterface, ActionType} from './CharacterAction';
import type {Context} from './Context';
import type {ProgressionStepInterface} from './ProgressionStep';
import type {RaceInterface} from './RaceInterface';
import type {Skill} from './Skill/Skill';
import type {SkillName} from './Skill/SkillName';
import type {Vision} from './Vision';

export type SkilledCharacter = {
	getTrainedSkills(): SkillName[];
	getSkills(): Record<SkillName, Skill>;
	getSkillTotal(skill: SkillName, context: Context): number;
	getSkillTrainingPoints(skill: SkillName): number;
};

export type AttributesCharacter = {
	getAttributes(): Attributes;
};

export type CharacterDispatch = <T extends ActionType>(action: ActionInterface<T>) => void;

export type ProgressingCharacter = {
	dispatch: CharacterDispatch;
	progressionSteps: Array<ProgressionStepInterface<ActionType>>;
};

export type DefensibleCharacter = {
	getDefenseTotal(context: Context): number;
};

export type VisionCharacter = {
	getVision(): Vision;
};

export type Location = {isUnderground: boolean};

export type SheetInterface = SkilledCharacter
& AttributesCharacter
& ProgressingCharacter
& DefensibleCharacter
& VisionCharacter;
