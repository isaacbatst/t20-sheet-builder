import type {Attributes} from '../Sheet/Attributes';
import {type TransactionInterface} from '../Sheet/TransactionInterface';
import {type RaceAbility} from './RaceAbility';
import type {RaceName} from './RaceName';
import {type SerializedRaces, type SerializedRace} from './SerializedRace';

export type RaceInterface<
	S extends SerializedRaces = SerializedRaces,
> = {
	name: RaceName;
	attributeModifiers: Partial<Attributes>;
	abilities: Record<string, RaceAbility>;
	addToSheet(transaction: TransactionInterface): void;
	serialize(): SerializedRace<S>;
};
