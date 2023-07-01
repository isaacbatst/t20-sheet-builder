import {Dwarf} from './Dwarf';
import {Human, VersatileChoiceFactory} from './Human';
import {type Race} from './Race';
import {type RaceInterface} from './RaceInterface';
import {RaceName} from './RaceName';
import {type SerializedDwarf, type SerializedHuman, type SerializedRace} from './SerializedRace';

export class RaceFactory {
	static makeFromSerialized(serializedRace: SerializedRace): RaceInterface {
		switch (serializedRace.name) {
			case RaceName.human:
				return RaceFactory.makeHuman(serializedRace);
			case RaceName.dwarf:
				return RaceFactory.makeDwarf(serializedRace);
			default:
				throw new Error('UNKNOWN_RACE');
		}
	}

	private static makeHuman(serializedRace: SerializedHuman) {
		const choices = serializedRace.versatileChoices.map(choice =>
			VersatileChoiceFactory.make(choice.type, choice.name),
		);
		return new Human(serializedRace.selectedAttributes, choices) as Race;
	}

	private static makeDwarf(_serializedRace: SerializedDwarf) {
		return new Dwarf();
	}
}
