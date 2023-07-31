import type {Attributes} from '../Sheet/Attributes';
import {type TransactionInterface} from '../Sheet/TransactionInterface';
import {type RaceAbility} from './RaceAbility';
import type {RaceName} from './RaceName';

export type RaceInterface = {
	name: RaceName;
	attributeModifiers: Partial<Attributes>;
	abilities: Record<string, RaceAbility>;
	addToSheet(transaction: TransactionInterface): void;
};
