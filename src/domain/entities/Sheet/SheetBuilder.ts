import {AddInitialEquipment} from '../Action/AddInitialEquipment';
import {ChooseOrigin} from '../Action/ChooseOrigin';
import {ChooseRace} from '../Action/ChooseRace';
import {ChooseRole} from '../Action/ChooseRole';
import {SetInitialAttributes} from '../Action/SetInitialAttributes';
import {TrainIntelligenceSkills} from '../Action/TrainIntelligenceSkills';
import type {Armor} from '../Inventory/Equipment/Weapon/DefensiveWeapon/Armor/Armor';
import type {MartialWeapon} from '../Inventory/Equipment/Weapon/OffensiveWeapon/MartialWeapon/MartialWeapon';
import type {SimpleWeapon} from '../Inventory/Equipment/Weapon/OffensiveWeapon/SimpleWeapon/SimpleWeapon';
import type {OriginInterface} from '../Origin/Origin';
import type {RaceInterface} from '../Race/RaceInterface';
import type {RoleInterface} from '../Role/RoleInterface';
import type {SkillName} from '../Skill/SkillName';
import type {Attributes} from './Attributes';
import {BuildingSheet} from './BuildingSheet';
import {CharacterSheet} from './CharacterSheet';
import {type SheetInterface} from './SheetInterface';
import {Transaction} from './Transaction';

export type SheetBuilderInitialEquipmentStep = {
	addInitialEquipment: (params: {
		simpleWeapon: SimpleWeapon;
		martialWeapon?: MartialWeapon;
		armor?: Armor;
		money: number;
	}) => SheetBuilderBuildStep;
};
export type SheetBuilderBuildStep = {
	build(): CharacterSheet;
};
export type SheetBuilderIntelligenceSkillsStep = {trainIntelligenceSkills: (skills: SkillName[]) => SheetBuilderInitialEquipmentStep};
export type SheetBuilderOriginStep = {chooseOrigin: (origin: OriginInterface) => SheetBuilderIntelligenceSkillsStep};
export type SheetBuilderRoleStep = {chooseRole: (role: RoleInterface) => SheetBuilderOriginStep};
export type SheetBuilderRaceStep = {chooseRace: (race: RaceInterface) => SheetBuilderRoleStep};

export class SheetBuilder {
	constructor(private sheet = new BuildingSheet()) {}

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
		const transaction = new Transaction(this.sheet);
		transaction.run(new SetInitialAttributes({transaction, payload: {attributes}}));
		transaction.commit();

		return {
			chooseRace: this.chooseRace(),
		};
	};

	private chooseRace(): SheetBuilderRaceStep['chooseRace'] {
		return (race: RaceInterface) => {
			const transaction = new Transaction(this.sheet);
			transaction.run(new ChooseRace({payload: {race}, transaction}));
			transaction.commit();

			return {
				chooseRole: this.chooseRole(race),
			};
		};
	}

	private chooseRole(race: RaceInterface): SheetBuilderRoleStep['chooseRole'] {
		return (role: RoleInterface) => {
			const transaction = new Transaction(this.sheet);
			transaction.run(new ChooseRole({transaction, payload: {role}}));
			transaction.commit();

			return {
				chooseOrigin: this.chooseOrigin(race, role),
			};
		};
	}

	private chooseOrigin(race: RaceInterface, role: RoleInterface): SheetBuilderOriginStep['chooseOrigin'] {
		return (origin: OriginInterface) => {
			const transaction = new Transaction(this.sheet);
			transaction.run(new ChooseOrigin({payload: {origin}, transaction}));
			transaction.commit();

			return {
				trainIntelligenceSkills: this.trainIntelligenceSkills(race, role, origin),
			};
		};
	}

	private trainIntelligenceSkills(race: RaceInterface, role: RoleInterface, origin: OriginInterface): SheetBuilderIntelligenceSkillsStep['trainIntelligenceSkills'] {
		return (skills: SkillName[]) => {
			const transaction = new Transaction(this.sheet);
			transaction.run(new TrainIntelligenceSkills({payload: {skills}, transaction}));
			transaction.commit();

			return {
				addInitialEquipment: this.addInitialEquipment(race, role, origin),
			};
		};
	}

	private addInitialEquipment(race: RaceInterface, role: RoleInterface, origin: OriginInterface): SheetBuilderInitialEquipmentStep['addInitialEquipment'] {
		return (params: {simpleWeapon: SimpleWeapon; martialWeapon?: MartialWeapon; armor?: Armor; money: number}) => {
			const transaction = new Transaction(this.sheet);
			transaction.run(new AddInitialEquipment({
				payload: {
					...params,
					role,
				},
				transaction,
			}));
			transaction.commit();

			return {
				build: () => this.build(race, role, origin),
			};
		};
	}

	private build(race: RaceInterface, role: RoleInterface, origin: OriginInterface) {
		const powers = this.sheet.getSheetPowers();
		powers.getGeneralPowers().forEach(power => {
			power.verifyRequirements(this.sheet);
		});
		powers.getOriginPowers().forEach(power => {
			power.verifyRequirements(this.sheet);
		});
		powers.getRolePowers().forEach(power => {
			power.verifyRequirements(this.sheet);
		});

		return this.createSheet(race, role, origin);
	}

	private createSheet(race: RaceInterface, role: RoleInterface, origin: OriginInterface) {
		return new CharacterSheet({
			race,
			role,
			origin,
			abilities: this.sheet.getSheetAbilities(),
			attributes: this.sheet.getSheetAttributes(),
			buildSteps: this.sheet.getBuildSteps(),
			defense: this.sheet.getSheetDefense(),
			displacement: this.sheet.getSheetDisplacement(),
			inventory: this.sheet.getSheetInventory(),
			level: this.sheet.getLevel(),
			lifePoints:	this.sheet.getSheetLifePoints(),
			manaPoints: this.sheet.getSheetManaPoints(),
			powers: this.sheet.getSheetPowers(),
			proficiencies: this.sheet.getSheetProficiencies(),
			skills: this.sheet.getSheetSkills(),
			spells: this.sheet.getSheetSpells(),
			vision: this.sheet.getSheetVision(),
		});
	}
}
