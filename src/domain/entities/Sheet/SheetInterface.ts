import type {TemporaryModifierInterface} from '../Modifier/TemporaryModifier/TemporaryModifierInterface';
import type {LifePoints} from '../Points/LifePoints/LifePoints';
import type {ManaPoints} from '../Points/ManaPoints/ManaPoints';
import type {ActionInterface, ActionType} from '../Sheet/SheetActions';
import type {SkillName} from '../Skill/SkillName';
import type {SheetBaseInterface} from './SheetBaseInterface';

export type Dispatch = <T extends ActionType>(buildStep: ActionInterface<T>) => void;
export type Location = {isUnderground: boolean};

export type SheetInterface = SheetBaseInterface & {
	getLifePoints(): LifePoints;
	getManaPoints(): ManaPoints;
	addDefenseTemporaryModifier(modifier: TemporaryModifierInterface): void;
	addSkillTemporaryModifier(skill: SkillName, modifier: TemporaryModifierInterface): void;
	addAttackTemporaryModifier(modifier: TemporaryModifierInterface): void;
	addDamageTemporaryModifier(modifier: TemporaryModifierInterface): void;
	useMana(value: number): void;
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
