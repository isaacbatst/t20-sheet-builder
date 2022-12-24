import {OutGameContext} from '../OutOfGameContext';
import type {ContextInterface} from '../Context';
import {GeneralPowerName} from '../Power/GeneralPowerName';
import {Proficiency} from '../Proficiency';
import {Dwarf} from '../Race/Dwarf';
import {Human} from '../Race/Human';
import type {Race} from '../Race/Race';
import type {VersatileChoice} from '../RaceAbility/Human/VersatileEffect';
import {ArcanistBuilder} from '../Role/Arcanist/ArcanistBuider';
import {ArcanistPathMage} from '../Role/Arcanist/ArcanistPath/ArcanistPathMage';
import type {Role} from '../Role/Role';
import {RoleAbilityName} from '../Role/RoleAbilityName';
import {Warrior} from '../Role/Warrior/Warrior';
import type {Sheet} from './Sheet';
import {SheetBuilder} from './SheetBuilder';
import {SkillName} from '../Skill/SkillName';
import {ArcaneArmor} from '../Spell/ArcaneArmor/ArcaneArmor';
import {FlamesExplosion} from '../Spell/FlamesExplosion/FlamesExplosion';
import {IllusoryDisguise} from '../Spell/IllusoryDisguise/IllusoryDisguise';
import {MentalDagger} from '../Spell/MentalDagger/MentalDagger';
import {Vision} from '../Vision';

describe('Sheet', () => {
	describe('Human Warrior', () => {
		let sheet: Sheet;
		let role: Role;
		let race: Race;
		let context: ContextInterface;
		let sheetBuilder: SheetBuilder;

		beforeEach(() => {
			const choices: VersatileChoice[] = [{name: SkillName.acrobatics, type: 'skill'}, {name: GeneralPowerName.dodge, type: 'power'}];
			race = new Human(['charisma', 'constitution', 'dexterity'], choices);
			context = new OutGameContext();
			role = new Warrior([SkillName.fight, SkillName.aim, SkillName.athletics]);
			sheetBuilder = new SheetBuilder();
			sheet = sheetBuilder
				.setInitialAttributes({strength: 0, dexterity: 0, charisma: 0, constitution: 0, intelligence: 0, wisdom: 0})
				.choseRace(race)
				.chooseRole(role);
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
			expect(sheet.getMaxLifePoints(context)).toBe(21);
		});

		it('should have role skills trained', () => {
			const trainedSkills = sheet.getTrainedSkills();
			expect(trainedSkills).toContain(SkillName.fight);
			expect(trainedSkills).toContain(SkillName.aim);
			expect(trainedSkills).toContain(SkillName.fortitude);
			expect(trainedSkills).toContain(SkillName.athletics);
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
			context = new OutGameContext();
			role = ArcanistBuilder
				.chooseSkills([SkillName.knowledge, SkillName.diplomacy])
				.choosePath(new ArcanistPathMage(new FlamesExplosion()))
				.chooseSpells([new ArcaneArmor(), new IllusoryDisguise(), new MentalDagger()]);
			race = new Dwarf();
			sheetBuilder = new SheetBuilder();
			sheet = sheetBuilder
				.setInitialAttributes({charisma: 0, constitution: 0, dexterity: 0, intelligence: 0, strength: 0, wisdom: 0})
				.choseRace(race)
				.chooseRole(role);
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
			expect(sheet.getMaxLifePoints(context)).toBe(13);
		});

		it('should have role skills trained', () => {
			const trainedSkills = sheet.getTrainedSkills();
			expect(trainedSkills).toContain(SkillName.mysticism);
			expect(trainedSkills).toContain(SkillName.will);
			expect(trainedSkills).toContain(SkillName.knowledge);
			expect(trainedSkills).toContain(SkillName.diplomacy);
		});

		it('should have basic proficiencies', () => {
			expect(sheet.getProficiencies()).toContain(Proficiency.simple);
			expect(sheet.getProficiencies()).toContain(Proficiency.lightArmor);
		});
	});
});
