import {type RaceInterface} from '../Race';
import {type SheetRaceInterface} from './SheetRaceInterface';

export class CharacterSheetRace implements SheetRaceInterface {
	constructor(
		private readonly race: RaceInterface,
	) {

	}

	getRace(): RaceInterface {
		return this.race;
	}
}
