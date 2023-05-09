import {type RaceInterface} from '../../Race';
import {type SheetRaceInterface} from '../SheetRaceInterface';
import {type TransactionInterface} from '../TransactionInterface';

export class BuildingSheetRace implements SheetRaceInterface {
	constructor(
		private race: RaceInterface | undefined = undefined,
	) {}

	chooseRace(race: RaceInterface, transaction: TransactionInterface) {
		this.race = race;
		this.race.addToSheet(transaction);
	}

	getRace(): RaceInterface | undefined {
		return this.race;
	}
}
