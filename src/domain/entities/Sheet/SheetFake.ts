import type {LifePoints} from '../Points/LifePoints/LifePoints';
import type {ManaPoints} from '../Points/ManaPoints/ManaPoints';
import type {SkillName} from '../Skill/SkillName';
import {SheetBaseFake} from './SheetBaseFake';
import type {SheetInterface} from './SheetInterface';

export class SheetFake extends SheetBaseFake implements SheetInterface {
	trainedSkills: SkillName[] = [];
	skillTotal = 0;
	skillTrainingPoints = 0;
	addSkillTemporaryModifier = jest.fn();
	addDefenseTemporaryModifier = jest.fn();
	useMana = jest.fn();
	addAttackTemporaryModifier = jest.fn();
	addDamageTemporaryModifier = jest.fn();
	getLifePoints(): LifePoints {
		throw new Error('Method not implemented.');
	}

	getManaPoints(): ManaPoints {
		throw new Error('Method not implemented.');
	}
}
