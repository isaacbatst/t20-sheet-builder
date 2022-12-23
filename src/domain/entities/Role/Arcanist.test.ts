import {AddProficiency} from '../Action/AddProficiency';
import {TrainSkill} from '../Action/TrainSkill';
import {BuildingSheetFake} from '../BuildingSheetFake';
import {SkillName} from '../Skill/SkillName';
import {Arcanist} from './Arcanist';
import {RoleName} from './RoleName';

describe('Arcanist', () => {
	it('should dispatch proper train skills', () => {
		const arcanist = new Arcanist([SkillName.knowledge, SkillName.diplomacy]);
		const sheet = new BuildingSheetFake();
		const dispatch = jest.fn();
		arcanist.addToSheet(sheet, dispatch);

		expect(dispatch).toHaveBeenCalledWith(new TrainSkill({
			name: SkillName.mysticism,
			source: RoleName.arcanist,
		}));

		expect(dispatch).toHaveBeenCalledWith(new TrainSkill({
			name: SkillName.will,
			source: RoleName.arcanist,
		}));

		expect(dispatch).toHaveBeenCalledWith(new TrainSkill({
			name: SkillName.knowledge,
			source: RoleName.arcanist,
		}));

		expect(dispatch).toHaveBeenCalledWith(new TrainSkill({
			name: SkillName.diplomacy,
			source: RoleName.arcanist,
		}));
	});

	it('should not train with missing chooses', () => {
		expect(() => {
			const arcanist = new Arcanist([SkillName.knowledge]);
		}).toThrow('MISSING_ROLE_SKILLS');
	});

	it('should not train with wrong skills', () => {
		expect(() => {
			const arcanist = new Arcanist([SkillName.knowledge, SkillName.athletics]);
		}).toThrow('INVALID_CHOSEN_SKILLS');
	});

	it('should not dispatch profiency add', () => {
		const arcanist = new Arcanist([SkillName.knowledge, SkillName.diplomacy]);
		const sheet = new BuildingSheetFake();
		const dispatch = jest.fn();
		arcanist.addToSheet(sheet, dispatch);
		expect(dispatch).not.toHaveBeenCalledWith(expect.objectContaining({type: 'addProficiency'}));
	});
});
