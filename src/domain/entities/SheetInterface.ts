import type {Attributes} from './Attributes';
import type {Context} from './Context';
import type {GeneralPowerMap, RaceAbilityMap, RoleAbilityMap, RolePowerMap} from './Map';
import type {ModifierInterface} from './ModifierList';
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
	addDefenseModifier(modifier: ModifierInterface): void;
};

export type SheetWithVision = {
	getVision(): Vision;
};

export type SheetAbilities = {role: RoleAbilityMap; race: RaceAbilityMap};

export type SheetWithAbilities = {
	getAbilities(): SheetAbilities;
};

export type SheetPowers = {general: GeneralPowerMap; role: RolePowerMap};

export type SheetWithPowers = {
	getPowers(): SheetPowers;
};

export type Location = {isUnderground: boolean};
export type SheetWithMana = {
	useMana(value: number): void;
};

export type SheetInterface = SkilledSheet
& SheetWithAttributes
& BuildedSheet
& DefensibleSheet
& SheetWithVision
& SheetWithAbilities
& SheetWithPowers
& SheetWithMana;

export type Appliable = {
	apply(sheet: SheetInterface): void;
};
