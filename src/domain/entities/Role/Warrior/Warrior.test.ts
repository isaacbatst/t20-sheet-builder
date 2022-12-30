import {AddProficiency} from '../../Action/AddProficiency';
import {ApplyRoleAbility} from '../../Action/ApplyRoleAbility';
import {TrainSkill} from '../../Action/TrainSkill';
import {BuildingSheetFake} from '../../Sheet/BuildingSheetFake';
import {Proficiency} from '../../Sheet/Proficiency';
import {SkillName} from '../../Skill/SkillName';
import {RoleName} from '../RoleName';
import {SpecialAttack} from './SpecialAttack/SpecialAttack';
import {Warrior} from './Warrior';
import {AddFixedModifierToLifePoints} from '../../Action/AddFixedModifierToLifePoints';
import {FixedModifier} from '../../Modifier/FixedModifier/FixedModifier';
import {AddPerLevelModifierToLifePoints} from '../../Action/AddPerLevelModifierToLifePoints';
import {PerLevelModifier} from '../../Modifier/PerLevelModifier/PerLevelModifier';
import {AddPerLevelModifierToManaPoints} from '../../Action/AddPerLevelModifierToManaPoints';

describe('Warrior', () => {
	it('should dispatch proper train skills', () => {
		const warrior = new Warrior([SkillName.fight, SkillName.animalHandling, SkillName.aim]);
		const sheet = new BuildingSheetFake();
		const dispatch = jest.fn();
		warrior.addToSheet(sheet, dispatch);

		expect(dispatch).toHaveBeenCalledWith(new TrainSkill({
			name: SkillName.fight,
			source: RoleName.warrior,
		}), sheet);
		expect(dispatch).toHaveBeenCalledWith(new TrainSkill({
			name: SkillName.animalHandling,
			source: RoleName.warrior,
		}), sheet);
		expect(dispatch).toHaveBeenCalledWith(new TrainSkill({
			name: SkillName.aim,
			source: RoleName.warrior,
		}), sheet);
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
		}), sheet);
		expect(dispatch).toHaveBeenCalledWith(new AddProficiency({
			proficiency: Proficiency.heavyArmor,
			source: RoleName.warrior,
		}), sheet);
		expect(dispatch).toHaveBeenCalledWith(new AddProficiency({
			proficiency: Proficiency.shield,
			source: RoleName.warrior,
		}), sheet);
	});

	it('should dispatch abilities add', () => {
		const warrior = new Warrior([SkillName.fight, SkillName.animalHandling, SkillName.aim]);
		const sheet = new BuildingSheetFake();
		const dispatch = jest.fn();
		warrior.addToSheet(sheet, dispatch);

		expect(dispatch).toHaveBeenCalledWith(new ApplyRoleAbility({
			ability: new SpecialAttack(),
			source: RoleName.warrior,
		}), sheet);
	});

	it('should dispatch life points modifiers add', () => {
		const warrior = new Warrior([SkillName.fight, SkillName.animalHandling, SkillName.aim]);
		const sheet = new BuildingSheetFake();
		const dispatch = jest.fn();
		warrior.addToSheet(sheet, dispatch);

		expect(dispatch).toHaveBeenCalledWith(new AddFixedModifierToLifePoints({
			modifier: new FixedModifier(RoleName.warrior, 20, new Set(['constitution'])),
		}), sheet);

		expect(dispatch).toHaveBeenCalledWith(new AddPerLevelModifierToLifePoints({
			modifier: new PerLevelModifier(RoleName.warrior, 5, false, new Set(['constitution'])),
		}), sheet);
	});

	it('should dispatch mana points modifiers add', () => {
		const warrior = new Warrior([SkillName.fight, SkillName.animalHandling, SkillName.aim]);
		const sheet = new BuildingSheetFake();
		const dispatch = jest.fn();
		warrior.addToSheet(sheet, dispatch);

		expect(dispatch).toHaveBeenCalledWith(new AddPerLevelModifierToManaPoints({
			modifier: new PerLevelModifier(RoleName.warrior, 3, true),
		}), sheet);
	});
});
