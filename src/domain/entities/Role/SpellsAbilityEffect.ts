import {PassiveEffect} from '../Ability/PassiveEffect';
import {LearnSpell} from '../Action/LearnSpell';
import {LearnCircle} from '../Action/LearnCircle';
import {SheetBuilderError} from '../../errors/SheetBuilderError';
import type {Attribute} from '../Sheet/Attributes';
import type {Level} from '../Sheet/Level';
import {type TransactionInterface} from '../Sheet/TransactionInterface';
import type {LearnableSpellType, Spell} from '../Spell/Spell';
import {SpellCircle} from '../Spell/SpellCircle';
import type {RoleAbilityName} from './RoleAbilityName';
import type {SpellLearnFrequency} from './SpellsAbility';

export abstract class SpellsAbilityEffect extends PassiveEffect {
	abstract spellType: LearnableSpellType;
	abstract spellsLearnFrequency: SpellLearnFrequency;
	abstract spellsAttribute: Attribute;
	abstract circleLearnLevel: Record<SpellCircle, Level>;

	constructor(readonly spells: Spell[], readonly initialSpells: number, source: RoleAbilityName) {
		super(source);
		this.validateSpells();
	}

	apply(transaction: TransactionInterface): void {
		transaction.run(new LearnCircle(
			{payload: {circle: SpellCircle.first, source: this.source, type: this.spellType}, transaction},
		));
		this.learnSpells(transaction);
	}

	private learnSpells(transaction: TransactionInterface) {
		this.spells.forEach(spell => {
			transaction.run(new LearnSpell({
				payload: {
					source: this.source,
					spell,
				},
				transaction,
			}));
		});
	}

	private validateSpells() {
		if (this.spells.length !== this.initialSpells) {
			throw new SheetBuilderError('INVALID_SPELLS_QUANTITY');
		}
	}
}
