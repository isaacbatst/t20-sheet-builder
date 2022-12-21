import type {Attributes} from './Attributes';
import type {Context} from './Context';
import type {ProgressionStepInterface} from './ProgressionStep';
import type {ActionInterface, ActionType} from './SheetActions';
import type {Skill} from './Skill/Skill';
import type {SkillName} from './Skill/SkillName';
import type {Vision} from './Vision';

export type SkilledSheet = {
	getTrainedSkills(): SkillName[];
	getSkills(): Record<SkillName, Skill>;
	getSkillTotal(skill: SkillName, context: Context): number;
	getSkillTrainingPoints(skill: SkillName): number;
};

export type SheetWithAttributes = {
	getAttributes(): Attributes;
};

export type Dispatch = <T extends ActionType>(action: ActionInterface<T>) => void;

export type ProgressingSheet = {
	dispatch: Dispatch;
	progressionSteps: Array<ProgressionStepInterface<ActionType>>;
};

export type DefensibleSheet = {
	getDefenseTotal(context: Context): number;
};

export type SheetWithVision = {
	getVision(): Vision;
};

export type Location = {isUnderground: boolean};

export type SheetInterface = SkilledSheet
& SheetWithAttributes
& ProgressingSheet
& DefensibleSheet
& SheetWithVision;
