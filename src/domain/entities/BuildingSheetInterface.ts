import type {Attributes} from './Attributes';
import type {ContextInterface} from './Context';
import type {LifePoints} from './LifePoints';
import type {ManaPoints} from './ManaPoints';
import type {ModifierInterface} from './ModifierList';
import type {Proficiency} from './Proficiency';
import type {BuildStep} from './ProgressionStep';
import type {SheetSkills} from './Sheet/Sheet';
import type {ActionsHandler} from './Sheet/SheetActions';
import type {SheetAbilities, SheetPowers} from './Sheet/SheetInterface';
import type {Vision} from './Vision';

export type DefenseInterface = {
	others: ModifiersListInterface;
	getTotal(dexterity: number, armorBonus: number, shieldBonus: number, context: ContextInterface): number;
};

export type ModifiersListInterface = {
	modifiers: ModifierInterface[];
	getTotal(context: ContextInterface): number;
	getMaxPossibleTotal(): number;
	add(newModifier: ModifierInterface): void;
};

export type BuildingSheetInterface = {
	buildSteps: BuildStep[];
	actionHandlers: ActionsHandler;
	getAttributes(): Attributes;
	getDefense(): DefenseInterface;
	getDisplacement(): number;
	getLevel(): number;
	getSkills(): SheetSkills;
	getVision(): Vision;
	getLifePoints(): LifePoints;
	getProficiencies(): Proficiency[];
	getAbilities(): SheetAbilities;
	getPowers(): SheetPowers;
	getManaPoints(): ManaPoints;
};
