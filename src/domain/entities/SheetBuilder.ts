import {SetInitialAttributes} from './Action/SetInitialAttributes';
import type {Attributes} from './Attributes';
import {BuildingSheet} from './BuildingSheet';
import type {BuildingSheetInterface} from './BuildingSheetInterface';
import {BuildStep} from './ProgressionStep';
import type {RaceInterface} from './RaceInterface';
import type {RoleInterface} from './Role/RoleInterface';
import {Sheet} from './Sheet';
import type {ActionInterface, ActionType} from './SheetActions';
import type {Dispatch} from './SheetInterface';

export class SheetBuilder {
	constructor(private sheet: BuildingSheetInterface = new BuildingSheet()) {

	}

	reset(sheet: BuildingSheetInterface = new BuildingSheet()) {
		this.sheet = sheet;

		return {
			setInitialAttributes: this.setInitialAttributes.bind(this),
		};
	}

	setInitialAttributes(attributes: Attributes) {
		this.dispatch(new SetInitialAttributes({attributes}));

		return {
			choseRace: this.chooseRace(),
		};
	}

	private chooseRace() {
		return (race: RaceInterface) => {
			race.addToSheet(this.sheet, this.dispatch);

			return {
				chooseRole: this.chooseRole(race),
			};
		};
	}

	private chooseRole(race: RaceInterface) {
		return (role: RoleInterface) => {
			role.addToSheet(this.sheet, this.dispatch);

			return new Sheet({
				attributes: this.sheet.getAttributes(),
				race,
				role,
				buildSteps: this.sheet.buildSteps,
				defense: this.sheet.getDefense(),
				displacement: this.sheet.getDisplacement(),
				level: this.sheet.getLevel(),
				lifePoints: this.sheet.getLifePoints(),
				skills: this.sheet.getSkills(),
				vision: this.sheet.getVision(),
				proficiencies: this.sheet.getProficiencies(),
				abilities: this.sheet.getAbilities(),
				powers: this.sheet.getPowers(),
				manaPoints: this.sheet.getManaPoints(),
			});
		};
	}

	private readonly dispatch: Dispatch = <T extends ActionType>(buildStep: ActionInterface<T>): void => {
		this.sheet.buildSteps.push(new BuildStep(buildStep, this.sheet));
		const handle = this.sheet.actionHandlers[buildStep.type];
		handle(buildStep.payload, this.dispatch);
	};
}
