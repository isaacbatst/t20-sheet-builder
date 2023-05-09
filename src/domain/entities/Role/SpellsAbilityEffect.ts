import {PassiveEffect} from '../Ability/PassiveEffect';
import {LearnCircle} from '../Action/LearnCircle';
import {SheetBuilderError} from '../Error/SheetBuilderError';
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

	applyToSheet(transaction: TransactionInterface): void {
		transaction.run(new LearnCircle(
			{payload: {circle: SpellCircle.first, source: this.source, type: this.spellType}, transaction},
		));
		this.learnSpells(transaction);
	}

	private learnSpells(transaction: TransactionInterface) {
		this.spells.forEach(spell => {
			spell.addToSheet(transaction, this.source);
		});
	}

	private validateSpells() {
		if (this.spells.length !== this.initialSpells) {
			throw new SheetBuilderError('INVALID_SPELLS_QUANTITY');
		}
	}
}
