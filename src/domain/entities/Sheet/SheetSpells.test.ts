import {ArcaneArmor, MentalDagger, SpellCircle, SpellName, SpellSchool} from '../Spell';
import {SheetSpells} from './SheetSpells';

describe('SheetSpells', () => {
	it('should have no learned circles', () => {
		const spells = new SheetSpells();
		expect(spells.getLearnedCircles().arcane).toHaveLength(0);
		expect(spells.getLearnedCircles().divine).toHaveLength(0);
	});

	it('should have no learned schools', () => {
		const spells = new SheetSpells();
		expect(spells.getLearnedSchools().arcane).toHaveLength(0);
		expect(spells.getLearnedSchools().divine).toHaveLength(0);
	});

	it('should learn spell circle with all its schools', () => {
		const spells = new SheetSpells();
		spells.learnCircle(SpellCircle.first, 'arcane');

		expect(spells.getLearnedCircles().arcane).toContain(SpellCircle.first);
		expect(spells.getLearnedCircles().divine).toHaveLength(0);
		expect(spells.getLearnedSchools().arcane).toEqual(new Set([
			SpellSchool.abjuration,
			SpellSchool.divination,
			SpellSchool.enchantment,
			SpellSchool.evocation,
			SpellSchool.illusion,
			SpellSchool.necromancy,
			SpellSchool.summoning,
			SpellSchool.transmutation,
		]));
		expect(spells.getLearnedSchools().divine).toEqual(new Set([]));
	});

	it('should learn spell from learned circle', () => {
		const spells = new SheetSpells();
		spells.learnCircle(SpellCircle.first, 'arcane');
		spells.learnSpell(new ArcaneArmor());
		expect(spells.getSpells().get(SpellName.arcaneArmor)).toBeDefined();
	});

	it('should learn specific spell circle school', () => {
		const spells = new SheetSpells();
		spells.learnCircle(SpellCircle.first, 'arcane', new Set([SpellSchool.abjuration]));
		expect(spells.getLearnedCircles().arcane).toContain(SpellCircle.first);
		expect(spells.getLearnedSchools().arcane).toEqual(new Set([
			SpellSchool.abjuration,
		]));
	});

	it('should not learn spell from unlearned circle', () => {
		const spells = new SheetSpells();
		expect(() => {
			spells.learnSpell(new ArcaneArmor());
		}).toThrowError();
	});

	it('should not learn spell from unlearned school', () => {
		const spells = new SheetSpells();
		spells.learnCircle(SpellCircle.first, 'arcane', new Set([SpellSchool.abjuration]));
		expect(() => {
			spells.learnSpell(new MentalDagger());
		}).toThrowError('SCHOOL_NOT_LEARNED');
	});
});
