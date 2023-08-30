import {DamageType} from '../../Damage/DamageType';
import {BuildingSheet} from '../../Sheet';
import {Transaction} from '../../Sheet/Transaction';
import {SkillName} from '../../Skill/SkillName';
import {ArcaneArmor} from '../../Spell/ArcaneArmor/ArcaneArmor';
import {FlamesExplosion} from '../../Spell/FlamesExplosion/FlamesExplosion';
import {IllusoryDisguise} from '../../Spell/IllusoryDisguise/IllusoryDisguise';
import {MentalDagger} from '../../Spell/MentalDagger/MentalDagger';
import {ArcanistBuilder} from './ArcanistBuider';
import {ArcanistPathSorcerer} from './ArcanistPath';
import {ArcanistPathWizard} from './ArcanistPath/ArcanisPathWizard/ArcanistPathWizard';
import {ArcanistPathWizardFocusWand} from './ArcanistPath/ArcanisPathWizard/ArcanistPathWizardFocusWand';
import {ArcanistPathMage} from './ArcanistPath/ArcanistPathMage/ArcanistPathMage';
import {ArcanistLineageDraconic} from './ArcanistPath/ArcanistPathSorcerer/ArcanistLineage';

describe('Arcanist', () => {
	let sheet: BuildingSheet;
	let transaction: Transaction;

	beforeEach(() => {
		sheet = new BuildingSheet();
		transaction = new Transaction(sheet);
	});

	it('should dispatch proper train skills', () => {
		const arcanist = ArcanistBuilder
			.chooseSkills([SkillName.knowledge, SkillName.diplomacy])
			.choosePath(new ArcanistPathMage(new FlamesExplosion()))
			.chooseSpells([new ArcaneArmor(), new IllusoryDisguise(), new MentalDagger()]);
		arcanist.addToSheet(transaction);

		const skills = transaction.sheet.getSkills();

		expect(skills[SkillName.knowledge].skill.getIsTrained()).toBe(true);
		expect(skills[SkillName.diplomacy].skill.getIsTrained()).toBe(true);
		expect(skills[SkillName.will].skill.getIsTrained()).toBe(true);
		expect(skills[SkillName.mysticism].skill.getIsTrained()).toBe(true);
	});

	it('should not train with missing chooses', () => {
		expect(() => {
			const arcanist = ArcanistBuilder
				.chooseSkills([SkillName.knowledge])
				.choosePath(new ArcanistPathMage(new FlamesExplosion()))
				.chooseSpells([new ArcaneArmor(), new IllusoryDisguise(), new MentalDagger()]);
		}).toThrow('MISSING_ROLE_SKILLS');
	});

	it('should not train with wrong skills', () => {
		expect(() => {
			const arcanist = ArcanistBuilder
				.chooseSkills([SkillName.knowledge, SkillName.athletics])
				.choosePath(new ArcanistPathMage(new FlamesExplosion()))
				.chooseSpells([new ArcaneArmor(), new IllusoryDisguise(), new MentalDagger()]);
		}).toThrow('INVALID_CHOSEN_SKILLS');
	});

	it('should not dispatch profiency add', () => {
		const arcanist = ArcanistBuilder
			.chooseSkills([SkillName.knowledge, SkillName.diplomacy])
			.choosePath(new ArcanistPathMage(new FlamesExplosion()))
			.chooseSpells([new ArcaneArmor(), new IllusoryDisguise(), new MentalDagger()]);
		arcanist.addToSheet(transaction);
		const proficiencies = transaction.sheet.getSheetProficiencies().getProficiencies();
		expect(proficiencies).toHaveLength(2);
	});

	it('should learn spells', () => {
		const arcanist = ArcanistBuilder
			.chooseSkills([SkillName.knowledge, SkillName.diplomacy])
			.choosePath(new ArcanistPathMage(new FlamesExplosion()))
			.chooseSpells([new ArcaneArmor(), new IllusoryDisguise(), new MentalDagger()]);

		arcanist.addToSheet(transaction);
		const spells = transaction.sheet.getSheetSpells().getSpells();
		expect(spells.has(ArcaneArmor.spellName)).toBeTruthy();
		expect(spells.has(MentalDagger.spellName)).toBeTruthy();
		expect(spells.has(IllusoryDisguise.spellName)).toBeTruthy();
	});

	describe('Mage', () => {
		it('should have intelligence as key attribute', () => {
			const arcanist = ArcanistBuilder
				.chooseSkills([SkillName.knowledge, SkillName.diplomacy])
				.choosePath(new ArcanistPathMage(new FlamesExplosion()))
				.chooseSpells([new ArcaneArmor(), new IllusoryDisguise(), new MentalDagger()]);

			expect(arcanist.getSpellsAttribute()).toBe('intelligence');
		});

		it('should learn all levels', () => {
			const arcanist = ArcanistBuilder
				.chooseSkills([SkillName.knowledge, SkillName.diplomacy])
				.choosePath(new ArcanistPathMage(new FlamesExplosion()))
				.chooseSpells([new ArcaneArmor(), new IllusoryDisguise(), new MentalDagger()]);

			expect(arcanist.getSpellLearnFrequency()).toBe('all');
		});

		it('should learn additional spell', () => {
			const mageExtraSpell = new FlamesExplosion();
			const arcanist = ArcanistBuilder
				.chooseSkills([SkillName.knowledge, SkillName.diplomacy])
				.choosePath(new ArcanistPathMage(mageExtraSpell))
				.chooseSpells([new ArcaneArmor(), new IllusoryDisguise(), new MentalDagger()]);

			const spells = transaction.sheet.getSheetSpells().getSpells();
			arcanist.addToSheet(transaction);
			expect(spells.has(mageExtraSpell.name)).toBeTruthy();
		});
	});

	describe('Wizard', () => {
		it('should have intelligence as key attribute', () => {
			const arcanist = ArcanistBuilder
				.chooseSkills([SkillName.knowledge, SkillName.diplomacy])
				.choosePath(new ArcanistPathWizard(new ArcanistPathWizardFocusWand()))
				.chooseSpells([new ArcaneArmor(), new IllusoryDisguise(), new MentalDagger()]);

			expect(arcanist.getSpellsAttribute()).toBe('intelligence');
		});

		it('should learn all levels', () => {
			const arcanist = ArcanistBuilder
				.chooseSkills([SkillName.knowledge, SkillName.diplomacy])
				.choosePath(new ArcanistPathWizard(new ArcanistPathWizardFocusWand()))
				.chooseSpells([new ArcaneArmor(), new IllusoryDisguise(), new MentalDagger()]);

			expect(arcanist.getSpellLearnFrequency()).toBe('all');
		});

		it('should dispatch add focus', () => {
			const focus = new ArcanistPathWizardFocusWand();
			const arcanist = ArcanistBuilder
				.chooseSkills([SkillName.knowledge, SkillName.diplomacy])
				.choosePath(new ArcanistPathWizard(focus))
				.chooseSpells([new ArcaneArmor(), new IllusoryDisguise(), new MentalDagger()]);

			arcanist.addToSheet(transaction);

			const equipments = transaction.sheet.getSheetInventory().getEquipments();
			expect(equipments.has(focus.equipment.name)).toBeTruthy();
		});
	});

	describe('Sorcerer', () => {
		it('should have charisma as key attribute', () => {
			const lineage = new ArcanistLineageDraconic(DamageType.fire);
			const arcanist = ArcanistBuilder
				.chooseSkills([SkillName.knowledge, SkillName.diplomacy])
				.choosePath(new ArcanistPathSorcerer(lineage))
				.chooseSpells([new ArcaneArmor(), new IllusoryDisguise(), new MentalDagger()]);

			expect(arcanist.getSpellsAttribute()).toBe('charisma');
		});
	});
});
