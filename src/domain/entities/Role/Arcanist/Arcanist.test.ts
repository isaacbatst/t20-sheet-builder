import {type Arcanist, SpellName, RoleAbilityName, EquipmentName} from '../..';
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
			.chooseSkills([[SkillName.knowledge, SkillName.diplomacy]])
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
				.chooseSkills([[SkillName.knowledge]])
				.choosePath(new ArcanistPathMage(new FlamesExplosion()))
				.chooseSpells([new ArcaneArmor(), new IllusoryDisguise(), new MentalDagger()]);
		}).toThrow('MISSING_ROLE_SKILLS');
	});

	it('should not train with wrong skills', () => {
		expect(() => {
			const arcanist = ArcanistBuilder
				.chooseSkills([[SkillName.knowledge, SkillName.athletics]])
				.choosePath(new ArcanistPathMage(new FlamesExplosion()))
				.chooseSpells([new ArcaneArmor(), new IllusoryDisguise(), new MentalDagger()]);
		}).toThrow('INVALID_CHOSEN_SKILLS');
	});

	it('should not dispatch profiency add', () => {
		const arcanist = ArcanistBuilder
			.chooseSkills([[SkillName.knowledge, SkillName.diplomacy]])
			.choosePath(new ArcanistPathMage(new FlamesExplosion()))
			.chooseSpells([new ArcaneArmor(), new IllusoryDisguise(), new MentalDagger()]);
		arcanist.addToSheet(transaction);
		const proficiencies = transaction.sheet.getSheetProficiencies().getProficiencies();
		expect(proficiencies).toHaveLength(2);
	});

	it('should learn spells', () => {
		const arcanist = ArcanistBuilder
			.chooseSkills([[SkillName.knowledge, SkillName.diplomacy]])
			.choosePath(new ArcanistPathMage(new FlamesExplosion()))
			.chooseSpells([new ArcaneArmor(), new IllusoryDisguise(), new MentalDagger()]);

		arcanist.addToSheet(transaction);
		const spells = transaction.sheet.getSheetSpells().getSpells();
		expect(spells.has(ArcaneArmor.spellName)).toBeTruthy();
		expect(spells.has(MentalDagger.spellName)).toBeTruthy();
		expect(spells.has(IllusoryDisguise.spellName)).toBeTruthy();
	});

	describe('Mage', () => {
		let arcanist: Arcanist;
		let mageSheet: BuildingSheet;
		let mageTransaction: Transaction;
		beforeEach(() => {
			arcanist = ArcanistBuilder
				.chooseSkills([[SkillName.knowledge, SkillName.diplomacy]])
				.choosePath(new ArcanistPathMage(new FlamesExplosion()))
				.chooseSpells([new ArcaneArmor(), new IllusoryDisguise(), new MentalDagger()]);
			mageSheet = new BuildingSheet();
			mageTransaction = new Transaction(mageSheet);
			arcanist.addToSheet(mageTransaction);
		});

		it('should have intelligence as key attribute', () => {
			expect(arcanist.getSpellsAttribute()).toBe('intelligence');
		});

		it('should learn all levels', () => {
			expect(arcanist.getSpellLearnFrequency()).toBe('all');
		});

		it('should learn additional spell', () => {
			const spells = mageSheet.getSheetSpells().getSpells();
			expect(spells.has(SpellName.flamesExplosion)).toBeTruthy();
		});

		it('should have mana modifier', () => {
			const modifiers = mageSheet.getSheetManaPoints().getFixedModifiers();
			const manaModifier = modifiers.get(RoleAbilityName.arcanistSpells);
			expect(manaModifier).toBeDefined();
		});
	});

	describe('Wizard', () => {
		let arcanist: Arcanist;
		let wizardSheet: BuildingSheet;
		let wizardTransaction: Transaction;
		beforeEach(() => {
			arcanist = ArcanistBuilder
				.chooseSkills([[SkillName.knowledge, SkillName.diplomacy]])
				.choosePath(new ArcanistPathWizard(new ArcanistPathWizardFocusWand()))
				.chooseSpells([new ArcaneArmor(), new IllusoryDisguise(), new MentalDagger()]);
			wizardSheet = new BuildingSheet();
			wizardTransaction = new Transaction(wizardSheet);
			arcanist.addToSheet(wizardTransaction);
		});

		it('should have intelligence as key attribute', () => {
			expect(arcanist.getSpellsAttribute()).toBe('intelligence');
		});

		it('should learn all levels', () => {
			expect(arcanist.getSpellLearnFrequency()).toBe('all');
		});

		it('should dispatch add focus', () => {
			const equipments = wizardSheet.getSheetInventory().getEquipments();
			expect(equipments.has(EquipmentName.wand)).toBeTruthy();
		});

		it('should have mana modifier', () => {
			const modifiers = wizardSheet.getSheetManaPoints().getFixedModifiers();
			const manaModifier = modifiers.get(RoleAbilityName.arcanistSpells);
			expect(manaModifier).toBeDefined();
			expect(manaModifier?.attributeBonuses).toEqual(['intelligence']);
		});
	});

	describe('Sorcerer', () => {
		let arcanist: Arcanist;
		let sorcererSheet: BuildingSheet;
		let sorcererTransaction: Transaction;
		beforeEach(() => {
			const lineage = new ArcanistLineageDraconic(DamageType.fire);
			arcanist = ArcanistBuilder
				.chooseSkills([[SkillName.knowledge, SkillName.diplomacy]])
				.choosePath(new ArcanistPathSorcerer(lineage))
				.chooseSpells([new ArcaneArmor(), new IllusoryDisguise(), new MentalDagger()]);

			sorcererSheet = new BuildingSheet();
			sorcererTransaction = new Transaction(sorcererSheet);
			arcanist.addToSheet(sorcererTransaction);
		});

		it('should have charisma as key attribute', () => {
			expect(arcanist.getSpellsAttribute()).toBe('charisma');
		});

		it('should have mana modifier', () => {
			const modifiers = sorcererSheet.getSheetManaPoints().getFixedModifiers();
			const manaModifier = modifiers.get(RoleAbilityName.arcanistSpells);
			expect(manaModifier).toBeDefined();
			expect(manaModifier?.attributeBonuses).toEqual(['charisma']);
		});
	});
});
