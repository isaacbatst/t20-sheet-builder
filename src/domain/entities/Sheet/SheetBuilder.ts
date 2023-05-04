import {AddInitialEquipment} from '../Action/AddInitialEquipment';
import {ChooseOrigin} from '../Action/ChooseOrigin';
import {ChooseRace} from '../Action/ChooseRace';
import {ChooseRole} from '../Action/ChooseRole';
import {SetInitialAttributes} from '../Action/SetInitialAttributes';
import {TrainIntelligenceSkills} from '../Action/TrainIntelligenceSkills';
import type {Armor} from '../Inventory/Equipment/Weapon/DefensiveWeapon/Armor';
import type {MartialWeapon} from '../Inventory/Equipment/Weapon/OfensiveWeapon/MartialWeapon';
import type {SimpleWeapon} from '../Inventory/Equipment/Weapon/OfensiveWeapon/SimpleWeapon';
import type {OriginInterface} from '../Origin/Origin';
import type {RaceInterface} from '../Race/RaceInterface';
import type {RoleInterface} from '../Role/RoleInterface';
import type {SkillName} from '../Skill/SkillName';
import type {Attributes} from './Attributes';
import {BuildingSheet} from './BuildingSheet';
import {Sheet} from './Sheet';

export type SheetBuilderInitialEquipmentStep = {
	addInitialEquipment: (params: {
		simpleWeapon: SimpleWeapon;
		martialWeapon?: MartialWeapon;
		armor?: Armor;
		money: number;
	}) => SheetBuilderBuildStep;
};
export type SheetBuilderBuildStep = {
	build(): Sheet;
};
export type SheetBuilderIntelligenceSkillsStep = {trainIntelligenceSkills: (skills: SkillName[]) => SheetBuilderInitialEquipmentStep};
export type SheetBuilderOriginStep = {chooseOrigin: (origin: OriginInterface) => SheetBuilderIntelligenceSkillsStep};
export type SheetBuilderRoleStep = {chooseRole: (role: RoleInterface) => SheetBuilderOriginStep};
export type SheetBuilderRaceStep = {chooseRace: (race: RaceInterface) => SheetBuilderRoleStep};

export class SheetBuilder {
	constructor(private sheet: BuildingSheet = new BuildingSheet()) {}

	getBuildingSheet(): BuildingSheet {
		return this.sheet;
	}

	reset(sheet: BuildingSheet = new BuildingSheet()) {
		this.sheet = sheet;

		return {
			setInitialAttributes: this.setInitialAttributes.bind(this),
		};
	}

	setInitialAttributes = (attributes: Attributes): SheetBuilderRaceStep => {
		this.sheet.initTransaction(new SetInitialAttributes({attributes}));

		return {
			chooseRace: this.chooseRace(),
		};
	};

	private chooseRace(): SheetBuilderRaceStep['chooseRace'] {
		return (race: RaceInterface) => {
			this.sheet.initTransaction(new ChooseRace({race}));

			return {
				chooseRole: this.chooseRole(race),
			};
		};
	}

	private chooseRole(race: RaceInterface): SheetBuilderRoleStep['chooseRole'] {
		return (role: RoleInterface) => {
			this.sheet.initTransaction(new ChooseRole({role}));

			return {
				chooseOrigin: this.chooseOrigin(race, role),
			};
		};
	}

	private chooseOrigin(race: RaceInterface, role: RoleInterface): SheetBuilderOriginStep['chooseOrigin'] {
		return (origin: OriginInterface) => {
			this.sheet.initTransaction(new ChooseOrigin({origin}));

			return {
				trainIntelligenceSkills: this.trainIntelligenceSkills(race, role, origin),
			};
		};
	}

	private trainIntelligenceSkills(race: RaceInterface, role: RoleInterface, origin: OriginInterface): SheetBuilderIntelligenceSkillsStep['trainIntelligenceSkills'] {
		return (skills: SkillName[]) => {
			this.sheet.initTransaction(new TrainIntelligenceSkills({skills}));

			return {
				addInitialEquipment: this.addInitialEquipment(race, role, origin),
			};
		};
	}

	private addInitialEquipment(race: RaceInterface, role: RoleInterface, origin: OriginInterface): SheetBuilderInitialEquipmentStep['addInitialEquipment'] {
		return (params: {simpleWeapon: SimpleWeapon; martialWeapon?: MartialWeapon; armor?: Armor; money: number}) => {
			this.sheet.initTransaction(new AddInitialEquipment({
				...params,
				role,
			}));

			return {
				build: () => this.build(race, role, origin),
			};
		};
	}

	private build(race: RaceInterface, role: RoleInterface, origin: OriginInterface) {
		this.sheet.powers.general.forEach(power => {
			power.verifyRequirements(this.sheet);
		});
		this.sheet.powers.origin.forEach(power => {
			power.verifyRequirements(this.sheet);
		});
		this.sheet.powers.role.forEach(power => {
			power.verifyRequirements(this.sheet);
		});

		const sheet = this.createSheet(race, role, origin);
		return sheet;
	}

	private createSheet(race: RaceInterface, role: RoleInterface, origin: OriginInterface) {
		return new Sheet({
			race,
			role,
			origin,
			buildSteps: this.sheet.buildSteps,
			money: this.sheet.getMoney(),
			attributes: this.sheet.getAttributes(),
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
			inventory: this.sheet.getInventory(),
		});
	}
}
