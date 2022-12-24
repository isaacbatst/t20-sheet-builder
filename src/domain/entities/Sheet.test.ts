import {OutGameContext} from './BuildingSheetContext';
import type {ContextInterface} from './Context';
import {GeneralPowerName} from './Power/GeneralPowerName';
import {Proficiency} from './Proficiency';
import {Dwarf} from './Race/Dwarf';
import {Human} from './Race/Human';
import type {Race} from './Race/Race';
import type {VersatileChoice} from './RaceAbility/Human/VersatileEffect';
import {ArcanistBuilder} from './Role/Arcanist/ArcanistBuider';
import {ArcanistPathMage} from './Role/Arcanist/ArcanistPathMage';
import type {Role} from './Role/Role';
import {RoleAbilityName} from './Role/RoleAbilityName';
import {Warrior} from './Role/Warrior/Warrior';
import type {Sheet} from './Sheet';
import {SheetBuilder} from './SheetBuilder';
import {SkillName} from './Skill/SkillName';
import {ArcaneArmor} from './Spell/ArcaneArmor/ArcaneArmor';
import {FlamesExplosion} from './Spell/FlamesExplosion/FlamesExplosion';
import {IllusoryDisguise} from './Spell/IllusoryDisguise/IllusoryDisguise';
import {MentalDagger} from './Spell/MentalDagger/MentalDagger';
import {Vision} from './Vision';

describe('Sheet', () => {
	describe('Human Warrior', () => {
		let humanWarrior: Sheet;
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
			humanWarrior = sheetBuilder
				.setInitialAttributes({strength: 0, dexterity: 0, charisma: 0, constitution: 0, intelligence: 0, wisdom: 0})
				.choseRace(race)
				.chooseRole(role);
		});

		it('should choose race', () => {
			expect(humanWarrior.getRace()).toBe(race);
		});

		it('should have displacement 9', () => {
			expect(humanWarrior.getDisplacement()).toBe(9);
		});

		it('should have default vision', () => {
			expect(humanWarrior.getVision()).toBe(Vision.default);
		});

		it('should choose role', () => {
			expect(humanWarrior.getRole()).toBe(role);
		});

		it('should have initial role life points + constitution', () => {
			expect(humanWarrior.getMaxLifePoints(context)).toBe(21);
		});

		it('should have role skills trained', () => {
			const trainedSkills = humanWarrior.getTrainedSkills();
			expect(trainedSkills).toContain(SkillName.fight);
			expect(trainedSkills).toContain(SkillName.aim);
			expect(trainedSkills).toContain(SkillName.fortitude);
			expect(trainedSkills).toContain(SkillName.athletics);
		});

		it('should have role abilities', () => {
			const abilities = humanWarrior.getAbilities();
			expect(abilities.role.has(RoleAbilityName.specialAttack)).toBeTruthy();
		});

		it('should have powers', () => {
			const powers = humanWarrior.getPowers();
			expect(powers.general.has(GeneralPowerName.dodge)).toBeTruthy();
		});
	});

	describe('Dwarf Arcanist', () => {
		let dwarfArcanist: Sheet;
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
			dwarfArcanist = sheetBuilder
				.setInitialAttributes({charisma: 0, constitution: 0, dexterity: 0, intelligence: 0, strength: 0, wisdom: 0})
				.choseRace(race)
				.chooseRole(role);
		});

		it('should choose race', () => {
			expect(dwarfArcanist.getRace()).toBe(race);
		});

		it('should have displacement 9', () => {
			expect(dwarfArcanist.getDisplacement()).toBe(6);
		});

		it('should have dark vision', () => {
			expect(dwarfArcanist.getVision()).toBe(Vision.dark);
		});

		it('should choose class', () => {
			expect(dwarfArcanist.getRole()).toBe(role);
		});

		it('should have initial role life points + constitution', () => {
			expect(dwarfArcanist.getMaxLifePoints(context)).toBe(13);
		});

		it('should have role skills trained', () => {
			const trainedSkills = dwarfArcanist.getTrainedSkills();
			expect(trainedSkills).toContain(SkillName.mysticism);
			expect(trainedSkills).toContain(SkillName.will);
			expect(trainedSkills).toContain(SkillName.knowledge);
			expect(trainedSkills).toContain(SkillName.diplomacy);
		});

		it('should have basic proficiencies', () => {
			expect(dwarfArcanist.getProficiencies()).toContain(Proficiency.simple);
			expect(dwarfArcanist.getProficiencies()).toContain(Proficiency.lightArmor);
		});
	});
});
