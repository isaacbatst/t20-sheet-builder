import {AddProficiency} from '../../Action/AddProficiency';
import {TrainSkill} from '../../Action/TrainSkill';
import {BuildingSheetFake} from '../../BuildingSheetFake';
import {SkillName} from '../../Skill/SkillName';
import {Arcanist} from './Arcanist';
import {RoleName} from '../RoleName';
import {ArcanistBuilder} from './ArcanistBuider';
import {ArcanistPathName} from './ArcanistPath';
import {ArcaneArmor} from '../../Spell/ArcaneArmor';
import {IllusoryDisguise} from '../../Spell/IllusoryDisguise';
import {MentalDagger} from '../../Spell/MentalDagger';
import {LearnSpell} from '../../Action/AddSpell';

describe('Arcanist', () => {
	it('should dispatch proper train skills', () => {
		const arcanist = ArcanistBuilder
			.chooseSkills([SkillName.knowledge, SkillName.diplomacy])
			.choosePath(ArcanistPathName.wizard)
			.chooseSpells([new ArcaneArmor(), new IllusoryDisguise(), new MentalDagger()]);
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
			const arcanist = ArcanistBuilder
				.chooseSkills([SkillName.knowledge])
				.choosePath(ArcanistPathName.wizard)
				.chooseSpells([new ArcaneArmor(), new IllusoryDisguise(), new MentalDagger()]);
		}).toThrow('MISSING_ROLE_SKILLS');
	});

	it('should not train with wrong skills', () => {
		expect(() => {
			const arcanist = ArcanistBuilder
				.chooseSkills([SkillName.knowledge, SkillName.athletics])
				.choosePath(ArcanistPathName.wizard)
				.chooseSpells([new ArcaneArmor(), new IllusoryDisguise(), new MentalDagger()]);
		}).toThrow('INVALID_CHOSEN_SKILLS');
	});

	it('should not dispatch profiency add', () => {
		const arcanist = ArcanistBuilder
			.chooseSkills([SkillName.knowledge, SkillName.diplomacy])
			.choosePath(ArcanistPathName.wizard)
			.chooseSpells([new ArcaneArmor(), new IllusoryDisguise(), new MentalDagger()]);
		const sheet = new BuildingSheetFake();
		const dispatch = jest.fn();
		arcanist.addToSheet(sheet, dispatch);
		expect(dispatch).not.toHaveBeenCalledWith(expect.objectContaining({type: 'addProficiency'}));
	});

	it('should learn spells', () => {
		const arcanist = ArcanistBuilder
			.chooseSkills([SkillName.knowledge, SkillName.diplomacy])
			.choosePath(ArcanistPathName.wizard)
			.chooseSpells([new ArcaneArmor(), new IllusoryDisguise(), new MentalDagger()]);

		expect(arcanist.spells).toContainEqual(new ArcaneArmor());

		const sheet = new BuildingSheetFake();
		const dispatch = jest.fn();
		arcanist.addToSheet(sheet, dispatch);

		expect(dispatch).toHaveBeenCalledWith(new LearnSpell({
			source: RoleName.arcanist,
			spell: new ArcaneArmor(),
		}));

		expect(dispatch).toHaveBeenCalledWith(new LearnSpell({
			source: RoleName.arcanist,
			spell: new MentalDagger(),
		}));

		expect(dispatch).toHaveBeenCalledWith(new LearnSpell({
			source: RoleName.arcanist,
			spell: new IllusoryDisguise(),
		}));
	});
});
