import {type BuildStepInterface} from '../BuildStep';
import {type CharacterAttack} from '../Character/CharacterAttack';
import {type EquipmentName} from '../Inventory';
import {LifePoints} from '../Points/LifePoints/LifePoints';
import {ManaPoints} from '../Points/ManaPoints/ManaPoints';
import {Level} from './Level';
import {SheetAbilities} from './SheetAbilities';
import {type SheetAbilitiesInterface} from './SheetAbilitiesInterface';
import {SheetAttributes} from './SheetAttributes';
import {type SheetAttributesInterface} from './SheetAttributesInterface';
import {SheetDefense} from './SheetDefense';
import {type SheetDefenseInterface} from './SheetDefenseInterface';
import {SheetDevotion} from './SheetDevotion';
import {SheetDisplacement} from './SheetDisplacement';
import {type SheetDisplacementInterface} from './SheetDisplacementInterface';
import {type SheetInterface} from './SheetInterface';
import {SheetInventory} from './SheetInventory';
import {type SheetInventoryInterface} from './SheetInventoryInterface';
import {SheetOriginFake} from './SheetOriginFake';
import {type SheetOriginInterface} from './SheetOriginInterface';
import {SheetPoints} from './SheetPoints';
import {type SheetPointsInterface} from './SheetPointsInterface';
import {SheetPowers} from './SheetPowers';
import {type SheetPowersInterface} from './SheetPowersInterface';
import {SheetProficiencies} from './SheetProficiencies';
import {type SheetProficienciesInterface} from './SheetProficienciesInterface';
import {SheetRaceFake} from './SheetRaceFake';
import {type SheetRaceInterface} from './SheetRaceInterface';
import {type SheetResistencesInterface} from './SheetResistencesInterface';
import {SheetResistences} from './SheetResistencies';
import {SheetRoleFake} from './SheetRoleFake';
import {type SheetRoleInterface} from './SheetRoleInterface';
import {SheetSize} from './SheetSize';
import {type SheetSizeInterface} from './SheetSizeInterface';
import {SheetSkills} from './SheetSkills';
import {type SheetSkillsInterface} from './SheetSkillsInterface';
import {SheetSpells} from './SheetSpells';
import {type SheetSpellsInterface} from './SheetSpellsInterface';
import {SheetVision} from './SheetVision';
import {type SheetVisionInterface} from './SheetVisionInterface';

export class SheetFake implements SheetInterface {
	buildSteps: BuildStepInterface[] = [];
	level: number = Level.one;
	sheetRace = new SheetRaceFake();
	sheetRole = new SheetRoleFake();
	sheetOrigin = new SheetOriginFake();
	sheetAbilities = new SheetAbilities();
	sheetLifePoints = new SheetPoints(new LifePoints());
	sheetManaPoints = new SheetPoints(new ManaPoints());
	sheetSkills = new SheetSkills();
	sheetAttributes = new SheetAttributes();
	sheetSpells = new SheetSpells();
	sheetInventory = new SheetInventory();
	sheetPowers = new SheetPowers();
	sheetDefense = new SheetDefense();
	sheetVision = new SheetVision();
	sheetProficiencies = new SheetProficiencies();
	sheetDisplacement = new SheetDisplacement();
	sheetSize = new SheetSize();
	sheetDevotion = new SheetDevotion();
	sheetResistences = new SheetResistences();

	serialize = vi.fn();

	getSheetDevotion(): SheetDevotion {
		return this.sheetDevotion;
	}

	getAttacks(): Map<EquipmentName, CharacterAttack> {
		return new Map();
	}

	pushBuildSteps(...buildSteps: BuildStepInterface[]): void {
		this.buildSteps.push(...buildSteps);
	}

	getBuildSteps(): BuildStepInterface[] {
		return this.buildSteps;
	}

	getLevel(): number {
		return this.level;
	}

	getSheetSize(): SheetSizeInterface {
		return this.sheetSize;
	}

	getSheetAbilities(): SheetAbilitiesInterface {
		return this.sheetAbilities;
	}

	getSheetOrigin(): SheetOriginInterface {
		return this.sheetOrigin;
	}

	getSheetLifePoints(): SheetPointsInterface {
		return this.sheetLifePoints;
	}

	getMaxLifePoints(): number {
		return this.sheetLifePoints.getMax(this.getSheetAttributes().getValues(), this.level);
	}

	getSheetManaPoints(): SheetPointsInterface {
		return this.sheetManaPoints;
	}

	getMaxManaPoints(): number {
		return this.sheetManaPoints.getMax(this.getSheetAttributes().getValues(), this.level);
	}

	getSheetSkills(): SheetSkillsInterface {
		return this.sheetSkills;
	}

	getSheetAttributes(): SheetAttributesInterface {
		return this.sheetAttributes;
	}

	getSheetSpells(): SheetSpellsInterface {
		return this.sheetSpells;
	}

	getSheetInventory(): SheetInventoryInterface {
		return this.sheetInventory;
	}

	getSheetPowers(): SheetPowersInterface {
		return this.sheetPowers;
	}

	getSheetDefense(): SheetDefenseInterface {
		return this.sheetDefense;
	}

	getSheetVision(): SheetVisionInterface {
		return this.sheetVision;
	}

	getSheetRace(): SheetRaceInterface {
		return this.sheetRace;
	}

	getSheetRole(): SheetRoleInterface {
		return this.sheetRole;
	}

	getSheetProficiencies(): SheetProficienciesInterface {
		return this.sheetProficiencies;
	}

	getSheetDisplacement(): SheetDisplacementInterface {
		return this.sheetDisplacement;
	}

	getSheetResistences(): SheetResistencesInterface {
		return this.sheetResistences;
	}
}
