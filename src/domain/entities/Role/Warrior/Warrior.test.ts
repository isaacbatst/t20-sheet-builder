import {AddFixedModifierToLifePoints} from '../../Action/AddFixedModifierToLifePoints';
import {AddPerLevelModifierToLifePoints} from '../../Action/AddPerLevelModifierToLifePoints';
import {AddPerLevelModifierToManaPoints} from '../../Action/AddPerLevelModifierToManaPoints';
import {AddProficiency} from '../../Action/AddProficiency';
import {ApplyRoleAbility} from '../../Action/ApplyRoleAbility';
import {TrainSkill} from '../../Action/TrainSkill';
import {FixedModifier} from '../../Modifier/FixedModifier/FixedModifier';
import {PerLevelModifier} from '../../Modifier/PerLevelModifier/PerLevelModifier';
import {Proficiency} from '../../Sheet/Proficiency';
import {TransactionFake} from '../../Sheet/TransactionFake';
import {SkillName} from '../../Skill/SkillName';
import {RoleName} from '../RoleName';
import {SpecialAttack} from './SpecialAttack/SpecialAttack';
import {Warrior} from './Warrior';

describe('Warrior', () => {
	it('should dispatch proper train skills', () => {
		const warrior = new Warrior([SkillName.fight, SkillName.animalHandling, SkillName.aim]);
		const transaction = new TransactionFake();
		warrior.addToSheet(transaction);

		expect(transaction.run).toHaveBeenCalledWith(new TrainSkill({
			payload: {
				skill: SkillName.fight,
				source: RoleName.warrior,
			},
			transaction,
		}));
		expect(transaction.run).toHaveBeenCalledWith(new TrainSkill({
			payload: {
				skill: SkillName.animalHandling,
				source: RoleName.warrior,
			},
			transaction,
		}));
		expect(transaction.run).toHaveBeenCalledWith(new TrainSkill({
			payload: {
				skill: SkillName.aim,
				source: RoleName.warrior,
			},
			transaction,
		}));
		expect(transaction.run).toHaveBeenCalledWith(new TrainSkill({
			payload: {
				skill: SkillName.fortitude,
				source: RoleName.warrior,
			},
			transaction,
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
		const transaction = new TransactionFake();
		warrior.addToSheet(transaction);

		expect(transaction.run).toHaveBeenCalledWith(new AddProficiency({
			payload: {
				proficiency: Proficiency.martial,
				source: RoleName.warrior,
			},
			transaction,
		}));
		expect(transaction.run).toHaveBeenCalledWith(new AddProficiency({
			payload: {
				proficiency: Proficiency.heavyArmor,
				source: RoleName.warrior,
			},
			transaction,
		}));
		expect(transaction.run).toHaveBeenCalledWith(new AddProficiency({
			payload: {
				proficiency: Proficiency.shield,
				source: RoleName.warrior,
			},
			transaction,
		}));
	});

	it('should dispatch abilities add', () => {
		const warrior = new Warrior([SkillName.fight, SkillName.animalHandling, SkillName.aim]);
		const transaction = new TransactionFake();
		warrior.addToSheet(transaction);

		expect(transaction.run).toHaveBeenCalledWith(new ApplyRoleAbility({
			payload: {
				ability: new SpecialAttack(),
				source: RoleName.warrior,
			},
			transaction,
		}));
	});

	it('should dispatch life points modifiers add', () => {
		const warrior = new Warrior([SkillName.fight, SkillName.animalHandling, SkillName.aim]);
		const transaction = new TransactionFake();
		warrior.addToSheet(transaction);

		expect(transaction.run).toHaveBeenCalledWith(new AddFixedModifierToLifePoints({
			payload: {
				modifier: new FixedModifier(RoleName.warrior, 20, new Set(['constitution'])),
			},
			transaction,
		}));

		expect(transaction.run).toHaveBeenCalledWith(new AddPerLevelModifierToLifePoints({
			payload: {
				modifier: new PerLevelModifier(RoleName.warrior, 5, false, new Set(['constitution'])),
			},
			transaction,
		}));
	});

	it('should dispatch mana points modifiers add', () => {
		const warrior = new Warrior([SkillName.fight, SkillName.animalHandling, SkillName.aim]);
		const transaction = new TransactionFake();
		warrior.addToSheet(transaction);

		expect(transaction.run).toHaveBeenCalledWith(new AddPerLevelModifierToManaPoints({
			payload: {
				modifier: new PerLevelModifier(RoleName.warrior, 3, true),
			},
			transaction,
		}));
	});
});
