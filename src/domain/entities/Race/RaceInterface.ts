import type {Attributes} from '../Sheet/Attributes';
import {type TransactionInterface} from '../Sheet/TransactionInterface';
import type {RaceName} from './RaceName';

export type RaceInterface = {
	name: RaceName;
	attributeModifiers: Partial<Attributes>;
	addToSheet(transaction: TransactionInterface): void;
};
