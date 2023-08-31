import {OutOfGameContext, SheetSerializer, Warrior, type SerializedSheetInterface} from '../..';
import {Dagger, EquipmentName, LeatherArmor, LongSword} from '../../Inventory';
import {Acolyte, OriginBenefitGeneralPower, OriginBenefitSkill, type OriginInterface} from '../../Origin';
import {IronWill, OneWeaponStyle} from '../../Power';
import {Human, VersatileChoicePower, VersatileChoiceSkill} from '../../Race';
import {type Race} from '../../Race/Race';
import {type Role} from '../../Role/Role';
import {SkillName} from '../../Skill';
import {type CharacterSheet} from '../CharacterSheet';
import {SheetBuilder} from '../SheetBuilder';

describe('SheetSerializer', () => {
	describe('Human Warrior', () => {
		let sheet: CharacterSheet;
		let role: Role;
		let race: Race;
		let sheetBuilder: SheetBuilder;
		let origin: OriginInterface;
		let serializedSheet: SerializedSheetInterface;
		beforeAll(() => {
			const choices = [
				new VersatileChoiceSkill(SkillName.acrobatics),
				new VersatileChoicePower(new OneWeaponStyle()),
			];
			race = new Human(['charisma', 'constitution', 'dexterity'], choices);
			role = new Warrior([[SkillName.fight], [SkillName.aim, SkillName.athletics]]);
			sheetBuilder = new SheetBuilder();
			origin = new Acolyte([new OriginBenefitGeneralPower(new IronWill()), new OriginBenefitSkill(SkillName.cure)]);
			sheet = sheetBuilder
				.setInitialAttributes({strength: 0, dexterity: 0, charisma: 0, constitution: 0, intelligence: 0, wisdom: 2})
				.chooseRace(race)
				.chooseRole(role)
				.chooseOrigin(origin)
				.trainIntelligenceSkills([])
				.addInitialEquipment({
					simpleWeapon: new Dagger(),
					armor: new LeatherArmor(),
					martialWeapon: new LongSword(),
					money: 24,
				})
				.build();

			const context = new OutOfGameContext();
			const serializer = new SheetSerializer(context);
			serializedSheet = serializer.serialize(sheet);
		});

		it('should have origin equipments', () => {
			expect(serializedSheet.equipments).toContainEqual(expect.objectContaining({name: EquipmentName.sacredSymbol}));
			expect(serializedSheet.equipments).toContainEqual(expect.objectContaining({name: EquipmentName.priestCostume}));
		});
	});
});
