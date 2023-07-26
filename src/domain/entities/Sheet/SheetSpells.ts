import {SheetBuilderError} from '../../errors';
import {type SpellCircle, type LearnableSpellType, type Spell} from '../Spell';
import {type SheetLearnedCircles, type SheetSpellsInterface, type SpellMap} from './SheetSpellsInterface';

export class SheetSpells implements SheetSpellsInterface {
	constructor(
		private readonly spells: SpellMap = new Map(),
		private readonly learnedCircles: SheetLearnedCircles = {
			arcane: new Set(),
			divine: new Set(),
		},
	) {}

	learnCircle(circle: SpellCircle, type: LearnableSpellType): void {
		this.learnedCircles[type].add(circle);
	}

	learnSpell(spell: Spell, needsCircle = true): void {
		if (needsCircle && !this.isSpellCircleLearned(spell)) {
			throw new SheetBuilderError('CIRCLE_NOT_LEARNED');
		}

		this.spells.set(spell.name, spell);
	}

	getLearnedCircles(): SheetLearnedCircles {
		return this.learnedCircles;
	}

	getSpells(): SpellMap {
		return this.spells;
	}

	private isSpellCircleLearned(spell: Spell) {
		if (spell.type !== 'universal') {
			return this.learnedCircles[spell.type].has(spell.circle);
		}

		return this.learnedCircles.arcane.has(spell.circle) || this.learnedCircles.divine.has(spell.circle);
	}
}
