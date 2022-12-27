import type {LifePoints} from '../Points/LifePoints/LifePoints';
import type {ManaPoints} from '../Points/ManaPoints/ManaPoints';
import type {ActionsHandler} from './SheetActions';
import type {SheetBaseInterface} from './SheetBaseInterface';

export type BuildingSheetInterface = SheetBaseInterface & {
	actionHandlers: ActionsHandler;
	buildLifePoints(): LifePoints;
	buildManaPoints(): ManaPoints;
};
