import {ApplyRaceAbility} from '../Action/ApplyRaceAbility';
import {ApplyRaceModifiers} from '../Action/ApplyRaceModifiers';
import type {Attributes} from '../Sheet/Attributes';
import {type TransactionInterface} from '../Sheet/TransactionInterface';
import type {RaceAbility} from './RaceAbility';
import type {RaceInterface} from './RaceInterface';
import type {RaceName} from './RaceName';
import {type SerializedRace, type SerializedRaceBasic, type SerializedRaces} from './SerializedRace';

export abstract class Race<
	S extends SerializedRaces = SerializedRaces,
> implements RaceInterface<S> {
	static 	serialize(race: Race): SerializedRaceBasic {
		return {
			name: race.name,
			abilities: Object.values(race.abilities).map(ability => ability.serialize()),
			attributeModifiers: race.attributeModifiers,
		};
	}

	abstract readonly attributeModifiers: Partial<Attributes>;
	abstract readonly abilities: Record<string, RaceAbility>;

	constructor(readonly name: RaceName) {}

	addToSheet(transaction: TransactionInterface): void {
		this.applyAttributesModifiers(transaction);
		this.applyAbilities(transaction);
	}

	serialize(): SerializedRace<S> {
		return {
			...Race.serialize(this),
			...this.serializeSpecific(),
		};
	}

	protected abstract serializeSpecific(): S;

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
