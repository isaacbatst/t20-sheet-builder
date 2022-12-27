import {SetInitialAttributes} from '../Action/SetInitialAttributes';
import type {Attributes} from '../Attributes';
import {OutOfGameContext} from '../OutOfGameContext';
import {BuildStep} from '../ProgressionStep';
import type {RaceInterface} from '../RaceInterface';
import type {RoleInterface} from '../Role/RoleInterface';
import type {ActionInterface, ActionType} from '../Sheet/SheetActions';
import type {Dispatch} from '../Sheet/SheetInterface';
import {BuildingSheet} from './BuildingSheet';
import type {BuildingSheetInterface} from './BuildingSheetInterface';
import {Sheet} from './Sheet';

export class SheetBuilder {
	readonly context = new OutOfGameContext();
	constructor(private sheet: BuildingSheetInterface = new BuildingSheet()) {

	}

	reset(sheet: BuildingSheetInterface = new BuildingSheet()) {
		this.sheet = sheet;

		return {
			setInitialAttributes: this.setInitialAttributes.bind(this),
		};
	}

	setInitialAttributes(attributes: Attributes) {
		this.sheet.dispatch(new SetInitialAttributes({attributes}));

		return {
			choseRace: this.chooseRace(),
		};
	}

	private chooseRace() {
		return (race: RaceInterface) => {
			race.addToSheet(this.sheet, this.sheet.dispatch);

			return {
				chooseRole: this.chooseRole(race),
			};
		};
	}

	private chooseRole(race: RaceInterface) {
		return (role: RoleInterface) => {
			role.addToSheet(this.sheet, this.sheet.dispatch);

			return new Sheet({
				attributes: this.sheet.getAttributes(),
				race,
				role,
				buildSteps: this.sheet.buildSteps,
				defense: this.sheet.getDefense(),
				displacement: this.sheet.getDisplacement(),
				level: this.sheet.getLevel(),
				skills: this.sheet.getSkills(),
				vision: this.sheet.getVision(),
				proficiencies: this.sheet.getProficiencies(),
				abilities: this.sheet.getAbilities(),
				powers: this.sheet.getPowers(),
				lifePoints: this.sheet.buildLifePoints(),
				manaPoints: this.sheet.buildManaPoints(),
				spells: this.sheet.getSpells(),
				learnedCircles: this.sheet.getLearnedCircles(),
				triggeredEffects: this.sheet.getTriggeredEffects(),
			});
		};
	}
}
