import type {BuildingSheetInterface} from './BuildingSheetInterface';
import type {ActionsHandler} from './SheetActions';
import {SheetBaseFake} from './SheetBaseFake';

export class BuildingSheetFake extends SheetBaseFake implements BuildingSheetInterface {
	actionHandlers: ActionsHandler = {
		addFixedModifierToSkill: jest.fn(),
		chooseRace: jest.fn(),
		trainSkill: jest.fn(),
		changeVision: jest.fn(),
		setInitialAttributes: jest.fn(),
		applyRaceModifiers: jest.fn(),
		applyRaceAbility: jest.fn(),
		pickGeneralPower: jest.fn(),
		pickRolePower: jest.fn(),
		changeDisplacement: jest.fn(),
		addFixedModifierToLifePoints: jest.fn(),
		chooseRole: jest.fn(),
		addProficiency: jest.fn(),
		applyRoleAbility: jest.fn(),
		learnCircle: jest.fn(),
		learnSpell: jest.fn(),
		addTriggeredEffect: jest.fn(),
		addPerLevelModifierToLifePoints: jest.fn(),
		addContextualModifierToSkill: jest.fn(),
		addFixedModifierToDefense: jest.fn(),
		addPerLevelModifierToManaPoints: jest.fn(),
	};

	buildLifePoints = jest.fn();
	buildManaPoints = jest.fn();
}
