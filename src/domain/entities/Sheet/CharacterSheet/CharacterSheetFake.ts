import {type CharacterSheetInterface} from './CharacterSheetInterface';

export class CharacterSheetFake implements CharacterSheetInterface {
	serialize = vi.fn();
	pushBuildSteps = vi.fn();
	getAttacks = vi.fn();
	getBuildSteps = vi.fn();
	getLevel = vi.fn();
	getSheetAbilities = vi.fn();
	getSheetOrigin = vi.fn();
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
	getSheetProficiencies = vi.fn();
	getSheetDisplacement = vi.fn();
	getSheetSize = vi.fn();
	getSheetDevotion = vi.fn();
	getSheetResistences = vi.fn();
}
