import {ApplyRaceAbility} from '../Action/ApplyRaceAbility';
import {ApplyRaceModifiers} from '../Action/ApplyRaceModifiers';
import type {Attributes} from '../Sheet/Attributes';
import {type TransactionInterface} from '../Sheet/TransactionInterface';
import type {RaceAbility} from './RaceAbility';
import type {RaceInterface} from './RaceInterface';
import type {RaceName} from './RaceName';

export abstract class Race implements RaceInterface {
	abstract readonly attributeModifiers: Partial<Attributes>;
	abstract readonly abilities: Record<string, RaceAbility>;

	constructor(readonly name: RaceName) {}

	addToSheet(transaction: TransactionInterface): void {
		this.applyAttributesModifiers(transaction);
		this.applyAbilities(transaction);
	}

	private applyAttributesModifiers(transaction: TransactionInterface): void {
		transaction.run(new ApplyRaceModifiers({
			payload: {
				modifiers: this.attributeModifiers,
			},
			transaction,
		}));
	}

	private applyAbilities(transaction: TransactionInterface): void {
		Object.values(this.abilities).forEach(ability => {
			transaction.run(new ApplyRaceAbility({
				payload: {
					ability,
					source: this.name,
				},
				transaction,
			}));
		});
	}
}
