import {AddProficiency} from '../Action/AddProficiency';
import {TrainSkill} from '../Action/TrainSkill';
import {BuildingSheetFake} from '../BuildingSheetFake';
import {Proficiency} from '../Proficiency';
import {SkillName} from '../Skill/SkillName';
import {RoleName} from './RoleName';
import {Warrior} from './Warrior';

describe('Warrior', () => {
	it('should dispatch proper train skills', () => {
		const warrior = new Warrior([SkillName.fight, SkillName.animalHandling, SkillName.aim]);
		const sheet = new BuildingSheetFake();
		const dispatch = jest.fn();
		warrior.addToSheet(sheet, dispatch);

		expect(dispatch).toHaveBeenCalledWith(new TrainSkill({
			name: SkillName.fight,
			source: RoleName.warrior,
		}));
		expect(dispatch).toHaveBeenCalledWith(new TrainSkill({
			name: SkillName.animalHandling,
			source: RoleName.warrior,
		}));
		expect(dispatch).toHaveBeenCalledWith(new TrainSkill({
			name: SkillName.aim,
			source: RoleName.warrior,
		}));
	});

	it('should not train skills choosing more than allowed from the same group', () => {
		expect(() => {
			const warrior = new Warrior([SkillName.fight, SkillName.animalHandling, SkillName.aim, SkillName.athletics]);
		}).toThrow('INVALID_CHOSEN_SKILLS');
	});

	it('should not train skills with less than required', () => {
		expect(() => {
			const warrior = new Warrior([SkillName.fight, SkillName.animalHandling]);
		}).toThrow('MISSING_ROLE_SKILLS');
	});

	it('should not train skills with repeated skills', () => {
		expect(() => {
			const warrior = new Warrior([SkillName.fight, SkillName.fight]);
		}).toThrow('REPEATED_ROLE_SKILLS');
	});

	it('should dispatch profiencies add', () => {
		const warrior = new Warrior([SkillName.fight, SkillName.animalHandling, SkillName.aim]);
		const sheet = new BuildingSheetFake();
		const dispatch = jest.fn();
		warrior.addToSheet(sheet, dispatch);

		expect(dispatch).toHaveBeenCalledWith(new AddProficiency({
			proficiency: Proficiency.martial,
			source: RoleName.warrior,
		}));
		expect(dispatch).toHaveBeenCalledWith(new AddProficiency({
			proficiency: Proficiency.heavyArmor,
			source: RoleName.warrior,
		}));
		expect(dispatch).toHaveBeenCalledWith(new AddProficiency({
			proficiency: Proficiency.shield,
			source: RoleName.warrior,
		}));
	});
});
