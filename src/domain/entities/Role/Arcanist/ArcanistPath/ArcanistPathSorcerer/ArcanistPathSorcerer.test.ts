import {DamageType} from '../../../../Damage/DamageType';
import {Shell} from '../../../../Power';
import {BuildingSheet} from '../../../../Sheet';
import {Transaction} from '../../../../Sheet/Transaction';
import {SkillName} from '../../../../Skill';
import {IllusoryDisguise, SpellCircle} from '../../../../Spell';
import {RoleAbilityName} from '../../../RoleAbilityName';
import {ArcanistLineageDraconic} from './ArcanistLineage/ArcanistLineageDraconic/ArcanistLineageDraconic';
import {ArcanistLineageFaerie} from './ArcanistLineage/ArcanistLineageFaerie/ArcanistLineageFaerie';
import {ArcanistLineageRed} from './ArcanistLineage/ArcanistLineageRed/ArcanistLineageRed';
import {ArcanistPathSorcerer} from './ArcanistPathSorcerer';

describe('ArcanistPathSorcerer', () => {
	let sheet: BuildingSheet;
	let transaction: Transaction;

	beforeEach(() => {
		sheet = new BuildingSheet();
		transaction = new Transaction(sheet);
	});

	it('should create sorcerer with draconic lineage', () => {
		const lineage = new ArcanistLineageDraconic(DamageType.fire);
		const arcanistPath = new ArcanistPathSorcerer(lineage);
		arcanistPath.addToSheet(transaction, RoleAbilityName.arcanistSupernaturalLineage);
		const lifeModifier = sheet.getSheetLifePoints().getFixedModifiers().get(RoleAbilityName.arcanistSupernaturalLineage);
		expect(lifeModifier).toBeDefined();
		expect(lifeModifier?.attributeBonuses).toContain('charisma');
	});

	it('should create sorcerer with faerie lineage', () => {
		const spell = new IllusoryDisguise();
		const lineage = new ArcanistLineageFaerie(spell);
		const arcanistPath = new ArcanistPathSorcerer(lineage);
		transaction.sheet.getSheetSpells().learnCircle(SpellCircle.first, 'arcane');
		arcanistPath.addToSheet(transaction, RoleAbilityName.arcanistSupernaturalLineage);

		expect(sheet.getSheetSpells().getSpells().get(spell.name)).toBeDefined();
		expect(sheet.getSkills()[SkillName.cheat].skill.getIsTrained()).toBe(true);
	});

	it('should create sorcerer with red lineage', () => {
		const power = new Shell();
		const lineage = new ArcanistLineageRed(power, 'wisdom');
		const arcanistPath = new ArcanistPathSorcerer(lineage);
		arcanistPath.addToSheet(transaction, RoleAbilityName.arcanistSupernaturalLineage);

		expect(sheet.getSheetAttributes().getTormentaPowersAttribute()).toBe('wisdom');
		expect(sheet.getSheetPowers().getGeneralPowers().get(power.name)).toBeDefined();
	});
});
