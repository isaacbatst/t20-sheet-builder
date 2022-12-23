import type {Attributes} from './Attributes';
import type {BuildingSheetInterface} from './BuildingSheetInterface';
import type {Context} from './Context';
import type {BuildStepInterface} from './ProgressionStep';
import type {ActionInterface, ActionType} from './SheetActions';
import type {SkillName} from './Skill/SkillName';
import type {Vision} from './Vision';

export type SkilledSheet = {
	getTrainedSkills(): SkillName[];
	getSkillTotal(skill: SkillName, context: Context): number;
	getSkillTrainingPoints(skill: SkillName): number;
};

export type SheetWithAttributes = {
	getAttributes(): Attributes;
};

export type Dispatch = <T extends ActionType>(buildStep: ActionInterface<T>) => void;

export type BuildedSheet = {
	buildSteps: BuildStepInterface[];
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
& BuildedSheet
& DefensibleSheet
& SheetWithVision;
