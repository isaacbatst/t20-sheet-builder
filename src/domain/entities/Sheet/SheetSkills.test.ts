import {Character} from '../Character';
import {OutOfGameContext, PreviewContext, type Context} from '../Context';
import {Dagger, LeatherArmor, LongSword} from '../Inventory';
import {Acolyte, OriginBenefitGeneralPower, OriginBenefitSkill, type OriginInterface} from '../Origin';
import {IronWill, OneWeaponStyle} from '../Power';
import {Human, VersatileChoicePower, VersatileChoiceSkill, type Race, type VersatileChoice} from '../Race';
import {Warrior} from '../Role';
import {type Role} from '../Role/Role';
import {SkillName} from '../Skill';
import {BuildingSheet} from './BuildingSheet';
import {type CharacterSheet} from './CharacterSheet';
import {SheetBuilder} from './SheetBuilder';

describe('SheetSkills', () => {
	let sheet: CharacterSheet;
	let role: Role;
	let race: Race;
	let sheetBuilder: SheetBuilder;
	let origin: OriginInterface;
	let character: Character;
	let context: Context;
	beforeEach(() => {
		const choices: VersatileChoice[] = [
			new VersatileChoiceSkill(SkillName.acrobatics),
			new VersatileChoicePower(new OneWeaponStyle()),
		];
		race = new Human(['charisma', 'constitution', 'dexterity'], choices);
		role = new Warrior([SkillName.fight, SkillName.aim, SkillName.athletics]);
		sheetBuilder = new SheetBuilder();
		origin = new Acolyte([new OriginBenefitGeneralPower(new IronWill()), new OriginBenefitSkill(SkillName.cure)]);
		sheet = sheetBuilder
			.setInitialAttributes({strength: 2, dexterity: 0, charisma: 0, constitution: 0, intelligence: 0, wisdom: 2})
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
		character = new Character(sheet);
		context = new PreviewContext(character);
	});

	it('should be serialized', () => {
		const sheet = new BuildingSheet();
		const context = new OutOfGameContext();
		const serialized = sheet.getSheetSkills().serialize(sheet, context);
		expect(serialized.intelligenceSkills).toHaveLength(0);
	});

	it('should get related attribute modifier', () => {
		const sheetSkills = character.sheet.getSkills();
		const result = sheetSkills[SkillName.survival].getAttributeModifier();
		expect(result).toBe(2);
	});

	it('should calculate total modifiers', () => {
		const sheetSkills = character.sheet.getSkills();
		const result = sheetSkills[SkillName.survival].getModifiersTotal();
		expect(result).toBe(2);
	});

	it('should roll skill', () => {
		const sheetSkills = character.sheet.getSkills();
		const result = sheetSkills[SkillName.survival].roll({
			get: vi.fn().mockReturnValue(10),
		});
		expect(result.total).toBe(12);
	});

	it('should roll trained skill', () => {
		const sheetSkills = character.sheet.getSkills();
		sheetSkills[SkillName.survival].skill.train();
		const result = sheetSkills[SkillName.survival].roll({
			get: vi.fn().mockReturnValue(10),
		});
		expect(result.total).toBe(14);
	});
});
