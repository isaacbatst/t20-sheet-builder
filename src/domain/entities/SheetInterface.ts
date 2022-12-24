import type {Attributes} from './Attributes';
import type {Context} from './Context';
import type {Level} from './Levels';
import type {GeneralPowerMap, RaceAbilityMap, RoleAbilityMap, RolePowerMap} from './Map';
import type {TemporaryModifierInterface} from './ModifierList';
import type {BuildStepInterface} from './ProgressionStep';
import type {SpellRole} from './Role/SpellRole';
import type {ActionInterface, ActionType} from './SheetActions';
import type {SkillName} from './Skill/SkillName';
import type {Vision} from './Vision';

export type Dispatch = <T extends ActionType>(buildStep: ActionInterface<T>) => void;
export type SkilledSheet = {
	getTrainedSkills(): SkillName[];
	getSkillTotal(skill: SkillName, context: Context): number;
	getSkillTrainingPoints(skill: SkillName): number;
	addSkillTemporaryModifier(skill: SkillName, modifier: TemporaryModifierInterface): void;
};
export type SheetWithAttributes = {
	getAttributes(): Attributes;
};
export type BuildedSheet = {
	buildSteps: BuildStepInterface[];
};
export type DefensibleSheet = {
	getDefenseTotal(context: Context): number;
	addDefenseTemporaryModifier(modifier: TemporaryModifierInterface): void;
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
& SheetWithMana & {
	getLevel(): Level;
	addAttackTemporaryModifier(modifier: TemporaryModifierInterface): void;
	addDamageTemporaryModifier(modifier: TemporaryModifierInterface): void;
};

export type SpellRoleSheetInterface = SheetInterface & {
	getRole(): SpellRole;
};

export type Appliable = {
	apply(sheet: SheetInterface): void;
};

export type EffectExecution = {
	execute(sheet: SheetInterface): void;
};

export type Activateable = {
	activate(sheet: SheetInterface, execution: EffectExecution): void;
};
