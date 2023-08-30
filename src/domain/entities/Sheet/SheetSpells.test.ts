import {ArcaneArmor, SpellCircle, SpellName} from '../Spell';
import {SheetSpells} from './SheetSpells';

describe('SheetSpells', () => {
	it('should learn spell circle', () => {
		const spells = new SheetSpells();
		spells.learnCircle(SpellCircle.first, 'arcane');

		expect(spells.getLearnedCircles().arcane).toContain(SpellCircle.first);
		expect(spells.getLearnedCircles().divine).toHaveLength(0);
	});

	it('should learn spell from learned circle', () => {
		const spells = new SheetSpells();
		spells.learnCircle(SpellCircle.first, 'arcane');
		spells.learnSpell(new ArcaneArmor());
		expect(spells.getSpells().get(SpellName.arcaneArmor)).toBeDefined();
	});

	it('should throw error when learning spell from unlearned circle', () => {
		const spells = new SheetSpells();
		expect(() => {
			spells.learnSpell(new ArcaneArmor());
		}).toThrowError();
	});
});
