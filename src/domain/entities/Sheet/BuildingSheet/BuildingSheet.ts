import {LifePoints} from '../../Points/LifePoints/LifePoints';
import {ManaPoints} from '../../Points/ManaPoints/ManaPoints';
import {Level} from '../Level';
import {Sheet} from '../Sheet';
import {SheetAbilities} from '../SheetAbilities';
import {SheetAttributes} from '../SheetAttributes';
import {SheetDefense} from '../SheetDefense';
import {SheetDevotion} from '../SheetDevotion';
import {SheetDisplacement} from '../SheetDisplacement';
import {SheetInventory} from '../SheetInventory';
import {SheetPoints} from '../SheetPoints';
import {SheetPowers} from '../SheetPowers';
import {SheetProficiencies} from '../SheetProficiencies';
import {SheetResistences} from '../SheetResistencies';
import {SheetSize} from '../SheetSize';
import {SheetSkills} from '../SheetSkills';
import {SheetSpells} from '../SheetSpells';
import {SheetTriggeredEffects} from '../SheetTriggeredEffects';
import {SheetVision} from '../SheetVision';
import {BuildingSheetOrigin} from './BuildingSheetOrigin';
import {BuildingSheetRace} from './BuildingSheetRace';
import {BuildingSheetRole} from './BuildingSheetRole';

export class BuildingSheet extends Sheet {
	protected sheetRace = new BuildingSheetRace();
	protected sheetRole = new BuildingSheetRole();
	protected sheetOrigin = new BuildingSheetOrigin();
	protected sheetAbilities = new SheetAbilities();
	protected sheetLifePoints = new SheetPoints(new LifePoints());
	protected sheetManaPoints = new SheetPoints(new ManaPoints());
	protected sheetSkills = new SheetSkills();
	protected sheetAttributes = new SheetAttributes();
	protected sheetSpells = new SheetSpells();
	protected sheetInventory = new SheetInventory();
	protected sheetPowers = new SheetPowers();
	protected sheetDefense = new SheetDefense();
	protected sheetVision = new SheetVision();
	protected sheetProficiencies = new SheetProficiencies();
	protected sheetDisplacement = new SheetDisplacement();
	protected sheetDevotion = new SheetDevotion();
	protected sheetSize = new SheetSize();
	protected sheetResistences = new SheetResistences();
	protected buildSteps = [];
	protected level = Level.one;
	protected sheetTriggeredEffects = new SheetTriggeredEffects();

	override getSheetRace(): BuildingSheetRace {
		return this.sheetRace;
	}

	override getSheetRole(): BuildingSheetRole {
		return this.sheetRole;
	}

	override getSheetOrigin(): BuildingSheetOrigin {
		return this.sheetOrigin;
	}
}
