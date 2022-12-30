import type {ContextInterface} from '../Context/ContextInterface';
import {OutOfGameContext} from '../Context/OutOfGameContext';
import {PointsMaxCalculatorFactory} from '../Points/PointsMaxCalculatorFactory';
import {Dodge} from '../Power/Dodge';
import {GeneralPowerName} from '../Power/GeneralPowerName';
import {Proficiency} from './Proficiency';
import {Dwarf} from '../Race/Dwarf/Dwarf';
import {Human} from '../Race/Human/Human';
import {VersatileChoice} from '../Race/Human/Versatile/VersatileChoice';
import {VersatileChoicePower} from '../Race/Human/Versatile/VersatileChoicePower';
import {VersatileChoiceSkill} from '../Race/Human/Versatile/VersatileChoiceSkill';
import type {Race} from '../Race/Race';
import {ArcanistBuilder} from '../Role/Arcanist/ArcanistBuider';
import {ArcanistPathMage} from '../Role/Arcanist/ArcanistPath/ArcanistPathMage';
import type {Role} from '../Role/Role';
import {RoleAbilityName} from '../Role/RoleAbilityName';
import {Warrior} from '../Role/Warrior/Warrior';
import {SkillName} from '../Skill/SkillName';
import {ArcaneArmor} from '../Spell/ArcaneArmor/ArcaneArmor';
import {FlamesExplosion} from '../Spell/FlamesExplosion/FlamesExplosion';
import {IllusoryDisguise} from '../Spell/IllusoryDisguise/IllusoryDisguise';
import {MentalDagger} from '../Spell/MentalDagger/MentalDagger';
import {Vision} from './Vision';
import type {Sheet} from './Sheet';
import {SheetBuilder} from './SheetBuilder';

describe('Sheet', () => {
	describe('Human Warrior', () => {
		let sheet: Sheet;
		let role: Role;
		let race: Race;
		let context: ContextInterface;
		let sheetBuilder: SheetBuilder;

		beforeEach(() => {
			const choices = [
				new VersatileChoiceSkill(SkillName.acrobatics),
				new VersatileChoicePower(new Dodge()),
			];
			race = new Human(['charisma', 'constitution', 'dexterity'], choices);
			context = new OutOfGameContext();
			role = new Warrior([SkillName.fight, SkillName.aim, SkillName.athletics]);
			sheetBuilder = new SheetBuilder();
			sheet = sheetBuilder
				.setInitialAttributes({strength: 0, dexterity: 0, charisma: 0, constitution: 0, intelligence: 0, wisdom: 0})
				.choseRace(race)
				.chooseRole(role)
				.trainIntelligenceSkills([]);
		});

		it('should choose race', () => {
			expect(sheet.getRace()).toBe(race);
		});

		it('should have displacement 9', () => {
			expect(sheet.getDisplacement()).toBe(9);
		});

		it('should have default vision', () => {
			expect(sheet.getVision()).toBe(Vision.default);
		});

		it('should choose role', () => {
			expect(sheet.getRole()).toBe(role);
		});

		it('should have initial role life points + constitution', () => {
			const calculator = PointsMaxCalculatorFactory.make(sheet.getAttributes(), sheet.getLevel());
			expect(sheet.getLifePoints().getMax(calculator)).toBe(21);
		});

		it('should have role skills trained', () => {
			const skills = sheet.getSkills();
			expect(skills.fight.getIsTrained()).toBeTruthy();
			expect(skills.aim.getIsTrained()).toBeTruthy();
			expect(skills.fortitude.getIsTrained()).toBeTruthy();
			expect(skills.athletics.getIsTrained()).toBeTruthy();
		});

		it('should have role abilities', () => {
			const abilities = sheet.getAbilities();
			expect(abilities.role.has(RoleAbilityName.specialAttack)).toBeTruthy();
		});

		it('should have powers', () => {
			const powers = sheet.getPowers();
			expect(powers.general.has(GeneralPowerName.dodge)).toBeTruthy();
		});
	});

	describe('Dwarf Arcanist', () => {
		let sheet: Sheet;
		let role: Role;
		let context: ContextInterface;
		let race: Race;
		let sheetBuilder: SheetBuilder;

		beforeEach(() => {
			context = new OutOfGameContext();
			role = ArcanistBuilder
				.chooseSkills([SkillName.knowledge, SkillName.diplomacy])
				.choosePath(new ArcanistPathMage(new FlamesExplosion()))
				.chooseSpells([new ArcaneArmor(), new IllusoryDisguise(), new MentalDagger()]);
			race = new Dwarf();
			sheetBuilder = new SheetBuilder();
			sheet = sheetBuilder
				.setInitialAttributes({charisma: 0, constitution: 0, dexterity: 0, intelligence: 0, strength: 0, wisdom: 0})
				.choseRace(race)
				.chooseRole(role)
				.trainIntelligenceSkills([]);
		});

		it('should choose race', () => {
			expect(sheet.getRace()).toBe(race);
		});

		it('should have displacement 9', () => {
			expect(sheet.getDisplacement()).toBe(6);
		});

		it('should have dark vision', () => {
			expect(sheet.getVision()).toBe(Vision.dark);
		});

		it('should choose class', () => {
			expect(sheet.getRole()).toBe(role);
		});

		it('should have initial role life points + constitution', () => {
			const calculator = PointsMaxCalculatorFactory.make(sheet.getAttributes(), sheet.getLevel());
			expect(sheet.getLifePoints().getMax(calculator)).toBe(13);
		});

		it('should have role skills trained', () => {
			const skills = sheet.getSkills();
			expect(skills.mysticism.getIsTrained()).toBeTruthy();
			expect(skills.will.getIsTrained()).toBeTruthy();
			expect(skills.knowledge.getIsTrained()).toBeTruthy();
			expect(skills.diplomacy.getIsTrained()).toBeTruthy();
		});

		it('should have basic proficiencies', () => {
			expect(sheet.getProficiencies()).toContain(Proficiency.simple);
			expect(sheet.getProficiencies()).toContain(Proficiency.lightArmor);
		});
	});
});
