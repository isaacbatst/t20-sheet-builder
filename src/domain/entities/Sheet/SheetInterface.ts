import type {LifePoints} from '../Points/LifePoints/LifePoints';
import type {ManaPoints} from '../Points/ManaPoints/ManaPoints';
import type {SheetBaseInterface} from './SheetBaseInterface';

export type Location = {isUnderground: boolean};

export type SheetInterface = SheetBaseInterface & {
	getLifePoints(): LifePoints;
	getManaPoints(): ManaPoints;
};

export type CostType = 'mana' | 'item';

export type Cost = {
	type: CostType;
};

export type EffectExecution = {
	execute(sheet: SheetInterface): void;
};
