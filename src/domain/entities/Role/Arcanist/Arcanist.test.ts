import {AddEquipment} from '../../Action/AddEquipment';
import {LearnSpell} from '../../Action/AddSpell';
import {TrainSkill} from '../../Action/TrainSkill';
import {EquipmentName} from '../../Inventory';
import {Equipment} from '../../Inventory/Equipment/Equipment';
import {BuildingSheetFake} from '../../Sheet/BuildingSheetFake';
import {SkillName} from '../../Skill/SkillName';
import {ArcaneArmor} from '../../Spell/ArcaneArmor/ArcaneArmor';
import {FlamesExplosion} from '../../Spell/FlamesExplosion/FlamesExplosion';
import {IllusoryDisguise} from '../../Spell/IllusoryDisguise/IllusoryDisguise';
import {MentalDagger} from '../../Spell/MentalDagger/MentalDagger';
import {RoleAbilityName} from '../RoleAbilityName';
import {RoleName} from '../RoleName';
import {ArcanistBuilder} from './ArcanistBuider';
import {ArcanistPathName} from './ArcanistPath';
import {ArcanistPathMage} from './ArcanistPath/ArcanistPathMage';
import {ArcanistPathWizard} from './ArcanistPath/ArcanistPathWizard';
import {ArcanistPathWizardFocus} from './ArcanistPath/ArcanistPathWizardFocus';

describe('Arcanist', () => {
	it('should dispatch proper train skills', () => {
		const arcanist = ArcanistBuilder
			.chooseSkills([SkillName.knowledge, SkillName.diplomacy])
			.choosePath(new ArcanistPathMage(new FlamesExplosion()))
			.chooseSpells([new ArcaneArmor(), new IllusoryDisguise(), new MentalDagger()]);
		const sheet = new BuildingSheetFake();
		const dispatch = jest.fn();
		arcanist.addToSheet(sheet, dispatch);

		expect(dispatch).toHaveBeenCalledWith(new TrainSkill({
			name: SkillName.mysticism,
			source: RoleName.arcanist,
		}), sheet);

		expect(dispatch).toHaveBeenCalledWith(new TrainSkill({
			name: SkillName.will,
			source: RoleName.arcanist,
		}), sheet);

		expect(dispatch).toHaveBeenCalledWith(new TrainSkill({
			name: SkillName.knowledge,
			source: RoleName.arcanist,
		}), sheet);

		expect(dispatch).toHaveBeenCalledWith(new TrainSkill({
			name: SkillName.diplomacy,
			source: RoleName.arcanist,
		}), sheet);
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
		const sheet = new BuildingSheetFake();
		const dispatch = jest.fn();
		arcanist.addToSheet(sheet, dispatch);
		expect(dispatch).not.toHaveBeenCalledWith(expect.objectContaining({type: 'addProficiency'}), sheet);
	});

	it('should learn spells', () => {
		const arcanist = ArcanistBuilder
			.chooseSkills([SkillName.knowledge, SkillName.diplomacy])
			.choosePath(new ArcanistPathMage(new FlamesExplosion()))
			.chooseSpells([new ArcaneArmor(), new IllusoryDisguise(), new MentalDagger()]);

		const sheet = new BuildingSheetFake();
		const dispatch = jest.fn();
		arcanist.addToSheet(sheet, dispatch);

		expect(dispatch).toHaveBeenCalledWith(new LearnSpell({
			source: RoleAbilityName.arcanistSpells,
			spell: new ArcaneArmor(),
		}), sheet);

		expect(dispatch).toHaveBeenCalledWith(new LearnSpell({
			source: RoleAbilityName.arcanistSpells,
			spell: new MentalDagger(),
		}), sheet);

		expect(dispatch).toHaveBeenCalledWith(new LearnSpell({
			source: RoleAbilityName.arcanistSpells,
			spell: new IllusoryDisguise(),
		}), sheet);
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
			const arcanist = ArcanistBuilder
				.chooseSkills([SkillName.knowledge, SkillName.diplomacy])
				.choosePath(new ArcanistPathMage(new FlamesExplosion()))
				.chooseSpells([new ArcaneArmor(), new IllusoryDisguise(), new MentalDagger()]);

			const sheet = new BuildingSheetFake();
			const dispatch = jest.fn();
			arcanist.addToSheet(sheet, dispatch);

			expect(dispatch).toHaveBeenCalledWith(new LearnSpell({
				source: ArcanistPathName.mage,
				spell: new FlamesExplosion(),
			}), sheet);
		});
	});

	describe('Wizard', () => {
		it('should have intelligence as key attribute', () => {
			const arcanist = ArcanistBuilder
				.chooseSkills([SkillName.knowledge, SkillName.diplomacy])
				.choosePath(new ArcanistPathWizard(new ArcanistPathWizardFocus(new Equipment(EquipmentName.wand))))
				.chooseSpells([new ArcaneArmor(), new IllusoryDisguise(), new MentalDagger()]);

			expect(arcanist.getSpellsAttribute()).toBe('intelligence');
		});

		it('should learn all levels', () => {
			const arcanist = ArcanistBuilder
				.chooseSkills([SkillName.knowledge, SkillName.diplomacy])
				.choosePath(new ArcanistPathWizard(new ArcanistPathWizardFocus(new Equipment(EquipmentName.wand))))
				.chooseSpells([new ArcaneArmor(), new IllusoryDisguise(), new MentalDagger()]);

			expect(arcanist.getSpellLearnFrequency()).toBe('all');
		});

		it('should dispatch focus add', () => {
			const focus = new ArcanistPathWizardFocus(new Equipment(EquipmentName.wand));
			const arcanist = ArcanistBuilder
				.chooseSkills([SkillName.knowledge, SkillName.diplomacy])
				.choosePath(new ArcanistPathWizard(focus))
				.chooseSpells([new ArcaneArmor(), new IllusoryDisguise(), new MentalDagger()]);

			const sheet = new BuildingSheetFake();
			const dispatch = jest.fn();
			arcanist.addToSheet(sheet, dispatch);

			expect(dispatch).toHaveBeenCalledWith(new AddEquipment({
				equipment: focus.equipment,
				source: ArcanistPathName.wizard,
			}), sheet);
		});
	});
});
