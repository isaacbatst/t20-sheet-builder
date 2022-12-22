import {TrainSkill} from '../Action/TrainSkill';
import {BuildingSheetFake} from '../SheetFake';
import {SkillName} from '../Skill/SkillName';
import {Arcanist} from './Arcanist';
import {RoleName} from './RoleName';

describe('Arcanist', () => {
	it('should dispatch proper train skills', () => {
		const arcanist = new Arcanist([SkillName.knowledge, SkillName.diplomacy]);
		const sheet = new BuildingSheetFake();

		arcanist.trainSkills(sheet);

		expect(sheet.dispatch).toHaveBeenCalledWith(new TrainSkill({
			name: SkillName.mysticism,
			source: RoleName.arcanist,
		}));

		expect(sheet.dispatch).toHaveBeenCalledWith(new TrainSkill({
			name: SkillName.will,
			source: RoleName.arcanist,
		}));

		expect(sheet.dispatch).toHaveBeenCalledWith(new TrainSkill({
			name: SkillName.knowledge,
			source: RoleName.arcanist,
		}));

		expect(sheet.dispatch).toHaveBeenCalledWith(new TrainSkill({
			name: SkillName.diplomacy,
			source: RoleName.arcanist,
		}));
	});

	it('should not train with missing chooses', () => {
		const arcanist = new Arcanist([SkillName.knowledge]);
		const sheet = new BuildingSheetFake();

		expect(() => {
			arcanist.trainSkills(sheet);
		}).toThrow('MISSING_ROLE_SKILLS');
	});

	it('should not train with wrong skills', () => {
		const arcanist = new Arcanist([SkillName.knowledge, SkillName.athletics]);
		const sheet = new BuildingSheetFake();

		expect(() => {
			arcanist.trainSkills(sheet);
		}).toThrow('INVALID_CHOSEN_SKILLS');
	});

	it('should not dispatch profiency add', () => {
		const arcanist = new Arcanist([SkillName.knowledge, SkillName.athletics]);
		const sheet = new BuildingSheetFake();

		arcanist.addProficiencies(sheet);

		expect(sheet.dispatch).not.toHaveBeenCalled();
	});
});
