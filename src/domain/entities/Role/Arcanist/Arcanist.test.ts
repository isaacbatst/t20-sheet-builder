import {AddEquipment} from '../../Action/AddEquipment';
import {LearnSpell} from '../../Action/AddSpell';
import {TrainSkill} from '../../Action/TrainSkill';
import {DamageType} from '../../Damage/DamageType';
import {SheetFake} from '../../Sheet/SheetFake';
import {Transaction} from '../../Sheet/Transaction';
import {TransactionFake} from '../../Sheet/TransactionFake';
import {SkillName} from '../../Skill/SkillName';
import {ArcaneArmor} from '../../Spell/ArcaneArmor/ArcaneArmor';
import {FlamesExplosion} from '../../Spell/FlamesExplosion/FlamesExplosion';
import {IllusoryDisguise} from '../../Spell/IllusoryDisguise/IllusoryDisguise';
import {MentalDagger} from '../../Spell/MentalDagger/MentalDagger';
import {RoleAbilityName} from '../RoleAbilityName';
import {RoleName} from '../RoleName';
import {ArcanistBuilder} from './ArcanistBuider';
import {ArcanistPathName, ArcanistPathSorcerer} from './ArcanistPath';
import {ArcanistPathWizard} from './ArcanistPath/ArcanisPathWizard/ArcanistPathWizard';
import {ArcanistPathWizardFocusWand} from './ArcanistPath/ArcanisPathWizard/ArcanistPathWizardFocusWand';
import {ArcanistPathMage} from './ArcanistPath/ArcanistPathMage/ArcanistPathMage';
import {ArcanistLineageDraconic} from './ArcanistPath/ArcanistPathSorcerer/ArcanistLineage';

describe('Arcanist', () => {
	it('should dispatch proper train skills', () => {
		const arcanist = ArcanistBuilder
			.chooseSkills([SkillName.knowledge, SkillName.diplomacy])
			.choosePath(new ArcanistPathMage(new FlamesExplosion()))
			.chooseSpells([new ArcaneArmor(), new IllusoryDisguise(), new MentalDagger()]);
		const transaction = new TransactionFake();
		arcanist.addToSheet(transaction);

		expect(transaction.run).toHaveBeenCalledWith(new TrainSkill({
			payload: {
				skill: SkillName.mysticism,
				source: RoleName.arcanist,
			},
			transaction,
		}));

		expect(transaction.run).toHaveBeenCalledWith(new TrainSkill({
			payload: {
				skill: SkillName.will,
				source: RoleName.arcanist,
			},
			transaction,
		}));

		expect(transaction.run).toHaveBeenCalledWith(new TrainSkill({
			payload: {
				skill: SkillName.knowledge,
				source: RoleName.arcanist,
			},
			transaction,
		}));

		expect(transaction.run).toHaveBeenCalledWith(new TrainSkill({
			payload: {
				skill: SkillName.diplomacy,
				source: RoleName.arcanist,
			},
			transaction,
		}));
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
		const transaction = new TransactionFake();
		arcanist.addToSheet(transaction);
		expect(transaction.run).not.toHaveBeenCalledWith(expect.objectContaining({type: 'addProficiency'}));
	});

	it('should learn spells', () => {
		const arcanist = ArcanistBuilder
			.chooseSkills([SkillName.knowledge, SkillName.diplomacy])
			.choosePath(new ArcanistPathMage(new FlamesExplosion()))
			.chooseSpells([new ArcaneArmor(), new IllusoryDisguise(), new MentalDagger()]);

		const transaction = new Transaction(new SheetFake());
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

			const transaction = new Transaction(new SheetFake());
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

			const transaction = new Transaction(new SheetFake());
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
