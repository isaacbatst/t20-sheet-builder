import {SheetBuilderError} from '../../errors';
import {type SpellCircle, type LearnableSpellType, type Spell, SpellSchool} from '../Spell';
import {type SerializedSheetSpell, type SerializedSheetLearnedCircles} from './SerializedSheet/SerializedSheetInterface';
import {type SheetLearnedSchools, type SheetLearnedCircles, type SheetSpellsInterface, type SpellMap} from './SheetSpellsInterface';

export class SheetSpells implements SheetSpellsInterface {
	constructor(
		private readonly spells: SpellMap = new Map(),
		private readonly learnedCircles: SheetLearnedCircles = {
			arcane: new Set(),
			divine: new Set(),
		},
		private readonly learnedSpellSchools: SheetLearnedSchools = {
			arcane: new Set(),
			divine: new Set(),
		},
	) {}

	learnCircle(circle: SpellCircle, type: LearnableSpellType, schools = new Set<SpellSchool>([
		SpellSchool.abjuration,
		SpellSchool.divination,
		SpellSchool.enchantment,
		SpellSchool.evocation,
		SpellSchool.illusion,
		SpellSchool.necromancy,
		SpellSchool.summoning,
		SpellSchool.transmutation,
	])): void {
		this.learnedCircles[type].add(circle);

		schools.forEach(school => {
			this.learnedSpellSchools[type].add(school);
		});
	}

	learnSpell(spell: Spell, needsCircle = true, needsSchool = true): void {
		if (needsCircle && !this.isSpellCircleLearned(spell)) {
			throw new SheetBuilderError('CIRCLE_NOT_LEARNED');
		}

		if (needsSchool && !this.isSpellSchoolLearned(spell)) {
			throw new SheetBuilderError('SCHOOL_NOT_LEARNED');
		}

		this.spells.set(spell.name, spell);
	}

	getLearnedCircles(): SheetLearnedCircles {
		return this.learnedCircles;
	}

	getLearnedSchools(): SheetLearnedSchools {
		return this.learnedSpellSchools;
	}

	getSpells(): SpellMap {
		return this.spells;
	}

	serializeLearnedCircles(): SerializedSheetLearnedCircles {
		const circlesPerType = this.getLearnedCircles();
		const serialized: SerializedSheetLearnedCircles = {
			arcane: [],
			divine: [],
		};

		Object.entries(circlesPerType).forEach(([type, circles]) => {
			serialized[type as LearnableSpellType] = [...circles];
		});

		return serialized;
	}

	serializeSpells(): SerializedSheetSpell[] {
		const serialized: SerializedSheetSpell[] = [];

		this.getSpells().forEach(spell => {
			const serializedSpell: SerializedSheetSpell = {
				name: spell.name,
				circle: spell.circle,
				abilityType: spell.abilityType,
				type: spell.type,
				effects: spell.effects.serialize(),
				school: spell.school,
				shortDescription: spell.shortDescription,
			};
			serialized.push(serializedSpell);
		});

		return serialized;
	}

	private isSpellSchoolLearned(spell: Spell) {
		if (spell.type !== 'universal') {
			return this.learnedSpellSchools[spell.type].has(spell.school);
		}

		return this.learnedSpellSchools.arcane.has(spell.school) || this.learnedSpellSchools.divine.has(spell.school);
	}

	private isSpellCircleLearned(spell: Spell) {
		if (spell.type !== 'universal') {
			return this.learnedCircles[spell.type].has(spell.circle);
		}

		return this.learnedCircles.arcane.has(spell.circle) || this.learnedCircles.divine.has(spell.circle);
	}
}
