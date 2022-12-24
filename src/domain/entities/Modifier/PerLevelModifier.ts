import type {Level} from '../Levels';
import type {Translatable} from '../Translator';

export class PerLevelModifier {
	constructor(
		readonly perLevelValue: number,
		readonly removeFirstLevel: boolean,
		readonly source: Translatable,
	) {}

	getValue(level: Level): number {
		if (this.removeFirstLevel) {
			return (level - 1) * this.perLevelValue;
		}

		return level * this.perLevelValue;
	}
}
