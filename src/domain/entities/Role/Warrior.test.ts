import {TrainSkill} from '../Action/TrainSkill';
import {BuildingSheetFake} from '../SheetFake';
import {SkillName} from '../Skill/SkillName';
import {RoleName} from './RoleName';
import {Warrior} from './Warrior';

describe('Warrior', () => {
	it('should dispatch proper train skills', () => {
		const warrior = new Warrior([SkillName.fight, SkillName.animalHandling, SkillName.aim]);
		const sheet = new BuildingSheetFake();
		warrior.trainSkills(sheet);

		expect(sheet.dispatch).toHaveBeenCalledWith(new TrainSkill({
			name: SkillName.fight,
			source: RoleName.warrior,
		}));
		expect(sheet.dispatch).toHaveBeenCalledWith(new TrainSkill({
			name: SkillName.animalHandling,
			source: RoleName.warrior,
		}));
		expect(sheet.dispatch).toHaveBeenCalledWith(new TrainSkill({
			name: SkillName.aim,
			source: RoleName.warrior,
		}));
	});

	it('should not train skills choosing only more than allowed from the same group', () => {
		const warrior = new Warrior([SkillName.fight, SkillName.animalHandling, SkillName.aim, SkillName.athletics]);
		const sheet = new BuildingSheetFake();
		expect(() => {
			warrior.trainSkills(sheet);
		}).toThrow('INVALID_CHOSEN_SKILLS');
	});

	it('should not train skills with less than required', () => {
		const warrior = new Warrior([SkillName.fight, SkillName.animalHandling]);
		const sheet = new BuildingSheetFake();
		expect(() => {
			warrior.trainSkills(sheet);
		}).toThrow('MISSING_ROLE_SKILLS');
	});

	it('should not train skills with repeated skills', () => {
		expect(() => {
			const warrior = new Warrior([SkillName.fight, SkillName.fight]);
		}).toThrow('REPEATED_ROLE_SKILLS');
	});
});
