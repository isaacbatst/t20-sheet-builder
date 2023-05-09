import {type RaceInterface} from '../Race';
import {type SheetRaceInterface} from './SheetRaceInterface';

export class SheetRaceFake implements SheetRaceInterface {
	chooseRace = vi.fn();
	constructor(
		public race: RaceInterface | undefined = undefined,
	) {}

	getRace(): RaceInterface | undefined {
		return this.race;
	}
}
