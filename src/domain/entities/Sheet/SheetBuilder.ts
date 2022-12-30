import {ChooseRace} from '../Action/ChooseRace';
import {ChooseRole} from '../Action/ChooseRole';
import {SetInitialAttributes} from '../Action/SetInitialAttributes';
import {TrainIntelligenceSkills} from '../Action/TrainIntelligenceSkills';
import type {Attributes} from './Attributes';
import {OutOfGameContext} from '../Context/OutOfGameContext';
import type {RaceInterface} from '../Race/RaceInterface';
import type {RoleInterface} from '../Role/RoleInterface';
import type {SkillName} from '../Skill/SkillName';
import {BuildingSheet} from './BuildingSheet';
import type {BuildingSheetInterface} from './BuildingSheetInterface';
import {Sheet} from './Sheet';
import type {OriginInterface} from '../Origin/Origin';
import {Origin} from '../Origin/Origin';
import {ChooseOrigin} from '../Action/ChooseOrigin';

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
		this.sheet.initTransaction(new SetInitialAttributes({attributes}));

		return {
			choseRace: this.chooseRace(),
		};
	}

	private chooseRace() {
		return (race: RaceInterface) => {
			this.sheet.initTransaction(new ChooseRace({race}));

			return {
				chooseRole: this.chooseRole(race),
			};
		};
	}

	private chooseRole(race: RaceInterface) {
		return (role: RoleInterface) => {
			this.sheet.initTransaction(new ChooseRole({role}));

			return {
				chooseOrigin: this.chooseOrigin(race, role),
			};
		};
	}

	private chooseOrigin(race: RaceInterface, role: RoleInterface) {
		return (origin: OriginInterface) => {
			this.sheet.initTransaction(new ChooseOrigin({origin}));

			return {
				trainIntelligenceSkills: this.trainIntelligenceSkills(race, role, origin),
			};
		};
	}

	private trainIntelligenceSkills(race: RaceInterface, role: RoleInterface, origin: OriginInterface) {
		return (skills: SkillName[]) => {
			this.sheet.initTransaction(new TrainIntelligenceSkills({skills}));

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
				lifePoints: this.sheet.getLifePoints(),
				manaPoints: this.sheet.getManaPoints(),
				spells: this.sheet.getSpells(),
				learnedCircles: this.sheet.getLearnedCircles(),
				equipments: this.sheet.getEquipments(),
			});
		};
	}
}
