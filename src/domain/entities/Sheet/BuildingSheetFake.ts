import type {BuildingSheetInterface} from './BuildingSheetInterface';
import {SheetBaseFake} from './SheetBaseFake';

export class BuildingSheetFake extends SheetBaseFake implements BuildingSheetInterface {
	buildLifePoints = jest.fn();
	buildManaPoints = jest.fn();
}
