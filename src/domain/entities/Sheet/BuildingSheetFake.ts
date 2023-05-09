import {vi} from 'vitest';
import {type BuildingSheetInterface} from './BuildingSheetInterface';

export class BuildingSheetFake implements BuildingSheetInterface {
	pushBuildSteps = vi.fn();
	getBuildSteps = vi.fn();
	getLevel = vi.fn();
	getSheetAbilities = vi.fn();
	getSheetLifePoints = vi.fn();
	getMaxLifePoints = vi.fn();
	getSheetManaPoints = vi.fn();
	getMaxManaPoints = vi.fn();
	getSheetSkills = vi.fn();
	getSheetAttributes = vi.fn();
	getSheetSpells = vi.fn();
	getSheetInventory = vi.fn();
	getSheetPowers = vi.fn();
	getSheetDefense = vi.fn();
	getSheetVision = vi.fn();
	getSheetRace = vi.fn();
	getSheetRole = vi.fn();
	getSheetOrigin = vi.fn();
	getSheetProficiencies = vi.fn();
	getSheetDisplacement = vi.fn();
}
