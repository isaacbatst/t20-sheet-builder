import {BuildingSheet} from './BuildingSheet';

export class BuildingSheetFake extends BuildingSheet {
	setLevel(level: number) {
		this.level = level;
	}
}
