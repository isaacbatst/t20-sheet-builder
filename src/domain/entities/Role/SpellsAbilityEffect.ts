import {PassiveEffect} from '../Ability/PassiveEffect';
import {LearnCircle} from '../Action/LearnCircle';
import type {Attribute} from '../Sheet/Attributes';
import type {Level} from '../Sheet/Levels';
import type {SheetBaseInterface} from '../Sheet/SheetBaseInterface';
import type {Dispatch} from '../Sheet/Transaction';
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

	applyToSheet(sheet: SheetBaseInterface, dispatch: Dispatch): void {
		dispatch(new LearnCircle(
			{circle: SpellCircle.first, source: this.source, type: this.spellType},
		), sheet);
		this.learnSpells(sheet, dispatch);
	}

	private learnSpells(sheet: SheetBaseInterface, dispatch: Dispatch) {
		this.spells.forEach(spell => {
			spell.addToSheet(sheet, dispatch, this.source);
		});
	}

	private validateSpells() {
		if (this.spells.length !== this.initialSpells) {
			throw new Error('INVALID_SPELLS_QUANTITY');
		}
	}
}
