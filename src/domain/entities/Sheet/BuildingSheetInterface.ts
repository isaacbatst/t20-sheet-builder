import type {LifePoints} from '../Points/LifePoints/LifePoints';
import type {ManaPoints} from '../Points/ManaPoints/ManaPoints';
import type {SheetBaseInterface} from './SheetBaseInterface';

export type BuildingSheetInterface = SheetBaseInterface & {
	buildLifePoints(): LifePoints;
	buildManaPoints(): ManaPoints;
};
