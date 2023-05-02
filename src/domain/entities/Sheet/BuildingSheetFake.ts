import type {BuildingSheetInterface} from './BuildingSheetInterface';
import {SheetBaseFake} from './SheetBaseFake';
import {vi} from 'vitest';

export class BuildingSheetFake extends SheetBaseFake implements BuildingSheetInterface {
	addInitialEquipment = vi.fn();
}
