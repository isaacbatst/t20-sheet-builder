import {ResistanceName} from '../../Resistance/ResistanceName';
import {TransactionFake} from '../../Sheet/TransactionFake';
import {SkillName} from '../../Skill/SkillName';
import {RaceAbilityName} from '../RaceAbilityName';
import {RaceName} from '../RaceName';
import {Lefeu} from './Lefeu';

describe('Lefeu', () => {
	it('should apply +1 to strength, dexterity and constitution, and -1 to charisma', () => {
		const lefeu = new Lefeu(['strength', 'constitution', 'dexterity']);
		lefeu.addDeformities([SkillName.acrobatics, SkillName.animalHandling]);

		const transaction = new TransactionFake();
		lefeu.addToSheet(transaction);

		expect(transaction.sheet.getSheetAttributes().getValues().charisma).toBe(-1);
		expect(transaction.sheet.getSheetAttributes().getValues().strength).toBe(1);
		expect(transaction.sheet.getSheetAttributes().getValues().constitution).toBe(1);
		expect(transaction.sheet.getSheetAttributes().getValues().dexterity).toBe(1);
	});

	it('should have a previous race default human', () => {
		const lefeu = new Lefeu(['strength', 'constitution', 'dexterity']);

		expect(lefeu.getPreviousRace()).toBe(RaceName.human);
	});

	it('should be able to change previous race', () => {
		const lefeu = new Lefeu(['strength', 'constitution', 'dexterity']);
		lefeu.setPreviousRace(RaceName.elf);

		expect(lefeu.getPreviousRace()).toBe(RaceName.elf);
	});

	it('should throw error when selecting charisma', () => {
		expect(() => {
			const lefeu = new Lefeu([
				'dexterity',
				'strength',
				'charisma',
			]);
		}).toThrow('INVALID_ATTRIBUTES_SELECTION');
	});

	it('should throw error with more than 3 selections', () => {
		expect(() => {
			const lefeu = new Lefeu([
				'constitution',
				'dexterity',
				'strength',
				'charisma',
			]);
		}).toThrow('INVALID_ATTRIBUTES_SELECTION');
	});

	it('should throw error with less than 3 selections', () => {
		expect(() => {
			const lefeu = new Lefeu([
				'constitution',
				'strength',
			]);
		}).toThrow('INVALID_ATTRIBUTES_SELECTION');
	});

	it('should throw error with repeated attributes', () => {
		expect(() => {
			const lefeu = new Lefeu([
				'constitution',
				'dexterity',
				'dexterity',
			]);
		}).toThrow('INVALID_ATTRIBUTES_SELECTION');
	});

	it('should add skills with deformities', () => {
		const lefeu = new Lefeu([
			'constitution',
			'dexterity',
			'strength',
		]);

		lefeu.addDeformities([SkillName.acrobatics, SkillName.animalHandling]);

		const transaction = new TransactionFake();
		lefeu.addToSheet(transaction);

		const {acrobatics, animalHandling} = transaction.sheet.getSheetSkills().getSkills();
		const acrobaticsModifier = acrobatics.fixedModifiers.modifiers[0];
		const animalHandlingModifier = animalHandling.fixedModifiers.modifiers[0];
		expect(acrobaticsModifier.baseValue).toBe(2);
		expect(animalHandlingModifier.baseValue).toBe(2);
		expect(acrobaticsModifier.source).toBe(RaceAbilityName.deformity);
		expect(animalHandlingModifier.source).toBe(RaceAbilityName.deformity);
	});

	it('should throw error if try to select more then 2 deformities', () => {
		expect(() => {
			const lefeu = new Lefeu([
				'constitution',
				'dexterity',
				'strength',
			]);

			lefeu.addDeformities([SkillName.acrobatics, SkillName.animalRide, SkillName.diplomacy]);
		}).toThrow('EXCEEDED_CHOICES_QUANTITY');
	});

	it('should add resistances', () => {
		const lefeu = new Lefeu([
			'constitution',
			'dexterity',
			'strength',
		]);

		lefeu.addDeformities([SkillName.acrobatics, SkillName.animalRide]);

		const transaction = new TransactionFake();
		lefeu.addToSheet(transaction);

		expect(transaction.sheet.getSheetResistences().getTotal(ResistanceName.lefeu, transaction.sheet.getSheetAttributes().getValues())).toBe(5);
		expect(transaction.sheet.getSheetResistences().getTotal(ResistanceName.tormenta, transaction.sheet.getSheetAttributes().getValues())).toBe(5);
	});
});
