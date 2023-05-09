import type {BuildStepInterface} from '../BuildStep';
import {type SheetInventoryInterface} from './SheetInventoryInterface';
import {type SheetAbilitiesInterface} from './SheetAbilitiesInterface';
import {type SheetAttributesInterface} from './SheetAttributesInterface';
import {type SheetDefenseInterface} from './SheetDefenseInterface';
import {type SheetDisplacementInterface} from './SheetDisplacementInterface';
import type {SheetInterface} from './SheetInterface';
import {type SheetOriginInterface} from './SheetOriginInterface';
import {type SheetPointsInterface} from './SheetPointsInterface';
import {type SheetPowersInterface} from './SheetPowersInterface';
import {type SheetProficienciesInterface} from './SheetProficienciesInterface';
import {type SheetRaceInterface} from './SheetRaceInterface';
import {type SheetRoleInterface} from './SheetRoleInterface';
import {type SheetSkillsInterface} from './SheetSkillsInterface';
import {type SheetSpellsInterface} from './SheetSpellsInterface';
import {type SheetVisionInterface} from './SheetVisionInterface';
export abstract class Sheet implements SheetInterface {
	protected abstract buildSteps: BuildStepInterface[];
	protected abstract level: number;
	protected abstract sheetAbilities: SheetAbilitiesInterface;
	protected abstract sheetOrigin: SheetOriginInterface;
	protected abstract sheetLifePoints: SheetPointsInterface;
	protected abstract sheetManaPoints: SheetPointsInterface;
	protected abstract sheetSkills: SheetSkillsInterface;
	protected abstract sheetAttributes: SheetAttributesInterface;
	protected abstract sheetSpells: SheetSpellsInterface;
	protected abstract sheetInventory: SheetInventoryInterface;
	protected abstract sheetPowers: SheetPowersInterface;
	protected abstract sheetDefense: SheetDefenseInterface;
	protected abstract sheetVision: SheetVisionInterface;
	protected abstract sheetRace: SheetRaceInterface;
	protected abstract sheetRole: SheetRoleInterface;
	protected abstract sheetProficiencies: SheetProficienciesInterface;
	protected abstract sheetDisplacement: SheetDisplacementInterface;

	pushBuildSteps(...buildSteps: BuildStepInterface[]): void {
		this.buildSteps.push(...buildSteps);
	}

	getBuildSteps(): BuildStepInterface[] {
		return this.buildSteps;
	}

	getLevel(): number {
		return this.level;
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
		const attributes = this.sheetAttributes.getValues();
		return this.sheetLifePoints.getMax(attributes, this.level);
	}

	getSheetManaPoints(): SheetPointsInterface {
		return this.sheetManaPoints;
	}

	getMaxManaPoints(): number {
		const attributes = this.sheetAttributes.getValues();
		return this.sheetManaPoints.getMax(attributes, this.level);
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
}
