import {type BuildingSheetOrigin} from './BuildingSheetOrigin';
import {type BuildingSheetRace} from './BuildingSheetRace';
import {type BuildingSheetRole} from './BuildingSheetRole';
import {type SheetInterface} from './SheetInterface';

export type BuildingSheetInterface = SheetInterface & {
	getSheetRace(): BuildingSheetRace;

	getSheetRole(): BuildingSheetRole;

	getSheetOrigin(): BuildingSheetOrigin;
};
