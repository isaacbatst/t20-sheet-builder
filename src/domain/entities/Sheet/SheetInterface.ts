import type {DefenseInterface} from '../Defense/DefenseInterface';
import type {Inventory} from '../Inventory/Inventory';
import type {LifePoints} from '../Points/LifePoints/LifePoints';
import type {ManaPoints} from '../Points/ManaPoints/ManaPoints';
import type {Attributes} from './Attributes';
import type {Proficiency} from './Proficiency';
import type {SheetSkills, SheetAbilities, SheetPowers, SheetSpells, SheetLearnedCircles} from './SheetBaseInterface';
import type {Vision} from './Vision';

export type Location = {isUnderground: boolean};

export type SheetInterface = {
	getAttributes(): Attributes;
	getDefense(): DefenseInterface;
	getDisplacement(): number;
	getLevel(): number;
	getSkills(): SheetSkills;
	getVision(): Vision;
	getProficiencies(): Proficiency[];
	getAbilities(): SheetAbilities;
	getPowers(): SheetPowers;
	getSpells(): SheetSpells;
	getLearnedCircles(): SheetLearnedCircles;
	getLifePoints(): LifePoints;
	getManaPoints(): ManaPoints;
	getInventory(): Inventory;
	getMoney(): number;
};

export type CostType = 'mana' | 'item';

export type Cost = {
	type: CostType;
};

export type EffectExecution = {
	execute(sheet: SheetInterface): void;
};
