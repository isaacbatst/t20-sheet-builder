import {AddInitialEquipment} from '../Action/AddInitialEquipment';
import {ChooseOrigin} from '../Action/ChooseOrigin';
import {ChooseRace} from '../Action/ChooseRace';
import {ChooseRole} from '../Action/ChooseRole';
import {SetInitialAttributes} from '../Action/SetInitialAttributes';
import {TrainIntelligenceSkills} from '../Action/TrainIntelligenceSkills';
import {SheetBuilderError} from '../Error';
import type {Armor} from '../Inventory/Equipment/Weapon/DefensiveWeapon/Armor/Armor';
import type {MartialWeapon} from '../Inventory/Equipment/Weapon/OffensiveWeapon/MartialWeapon/MartialWeapon';
import type {SimpleWeapon} from '../Inventory/Equipment/Weapon/OffensiveWeapon/SimpleWeapon/SimpleWeapon';
import type {OriginInterface} from '../Origin/Origin';
import type {RaceInterface} from '../Race/RaceInterface';
import type {RoleInterface} from '../Role/RoleInterface';
import type {SkillName} from '../Skill/SkillName';
import type {Attributes} from './Attributes';
import {BuildingSheet} from './BuildingSheet/BuildingSheet';
import {CharacterSheet} from './CharacterSheet/CharacterSheet';
import {Transaction} from './Transaction';

export type SheetBuilderInitialEquipmentParams = {
	simpleWeapon: SimpleWeapon;
	martialWeapon?: MartialWeapon;
	armor?: Armor;
	money: number;
};

export type SheetBuilderInterface = {
	build(): CharacterSheet;
	reset(): SheetBuilder;
	addInitialEquipment(params: SheetBuilderInitialEquipmentParams): SheetBuilder;
	trainIntelligenceSkills(skills: SkillName[]): SheetBuilder;
	chooseOrigin(origin: OriginInterface): SheetBuilder;
	chooseRole(role: RoleInterface): SheetBuilder;
	chooseRace(race: RaceInterface): SheetBuilder;
};

export class SheetBuilder implements SheetBuilderInterface {
	constructor(private sheet = new BuildingSheet()) {}

	getBuildingSheet(): BuildingSheet {
		return this.sheet;
	}

	reset(sheet: BuildingSheet = new BuildingSheet()) {
		this.sheet = sheet;

		return this;
	}

	setInitialAttributes = (attributes: Attributes): this => {
		const transaction = new Transaction(this.sheet);
		transaction.run(new SetInitialAttributes({transaction, payload: {attributes}}));
		transaction.commit();

		return this;
	};

	public chooseRace(race: RaceInterface): this {
		const transaction = new Transaction(this.sheet);
		transaction.run(new ChooseRace({payload: {race}, transaction}));
		transaction.commit();

		return this;
	}

	public chooseRole(role: RoleInterface): this {
		const transaction = new Transaction(this.sheet);
		transaction.run(new ChooseRole({transaction, payload: {role}}));
		transaction.commit();

		return this;
	}

	public chooseOrigin(origin: OriginInterface) {
		const transaction = new Transaction(this.sheet);
		transaction.run(new ChooseOrigin({payload: {origin}, transaction}));
		transaction.commit();
		return this;
	}

	public trainIntelligenceSkills(skills: SkillName[]) {
		const transaction = new Transaction(this.sheet);
		transaction.run(new TrainIntelligenceSkills({payload: {skills}, transaction}));
		transaction.commit();

		return this;
	}

	public addInitialEquipment(params: {simpleWeapon: SimpleWeapon; martialWeapon?: MartialWeapon; armor?: Armor; money: number}) {
		const transaction = new Transaction(this.sheet);
		const sheetRole = this.sheet.getSheetRole();
		const role = sheetRole.getRole();

		if (!role) {
			throw new SheetBuilderError('REQUIRED_ROLE_FOR_INITIAL_EQUIPMENT');
		}

		transaction.run(new AddInitialEquipment({
			payload: {
				...params,
				role,
			},
			transaction,
		}));
		transaction.commit();
		return this;
	}

	public build() {
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

		return this.createSheet();
	}

	private createSheet() {
		const race = this.sheet.getSheetRace().getRace();
		const role = this.sheet.getSheetRole().getRole();
		const origin = this.sheet.getSheetOrigin().getOrigin();

		if (!race) {
			throw new SheetBuilderError('REQUIRED_RACE');
		}

		if (!role) {
			throw new SheetBuilderError('REQUIRED_ROLE');
		}

		if (!origin) {
			throw new SheetBuilderError('REQUIRED_ORIGIN');
		}

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
