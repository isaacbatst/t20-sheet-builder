import type {Attributes} from './Attributes';
import {BuildingSheet} from './BuildingSheet';
import type {BuildingSheetInterface} from './BuildingSheetInterface';
import type {RaceInterface} from './RaceInterface';
import type {RoleInterface} from './Role/RoleInterface';
import {Sheet} from './Sheet';

export class SheetBuilder {
	static setInitialAttributes(attributes?: Partial<Attributes>) {
		const sheet = new BuildingSheet(attributes);

		return {
			choseRace: SheetBuilder.chooseRace(sheet),
		};
	}

	private static chooseRace(sheet: BuildingSheetInterface) {
		return (race: RaceInterface) => {
			sheet.dispatch({
				type: 'chooseRace',
				payload: {
					race,
				},
			});

			return {
				chooseRole: SheetBuilder.chooseRole(sheet, race),
			};
		};
	}

	private static chooseRole(sheet: BuildingSheetInterface, race: RaceInterface) {
		return (role: RoleInterface) => {
			sheet.dispatch({
				type: 'chooseRole',
				payload: {role},
			});

			return new Sheet({
				attributes: sheet.getAttributes(),
				race,
				role,
				buildSteps: sheet.buildSteps,
				defense: sheet.getDefense(),
				displacement: sheet.getDisplacement(),
				level: sheet.getLevel(),
				lifePoints: sheet.getLifePoints(),
				skills: sheet.getSkills(),
				vision: sheet.getVision(),
				proficiencies: sheet.getProficiencies(),
			});
		};
	}

	readonly buildingSheet: BuildingSheetInterface = new BuildingSheet();
}
