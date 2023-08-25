import {AddFixedModifierToLifePoints} from '../../../Action/AddFixedModifierToLifePoints';
import {AddPerLevelModifierToLifePoints} from '../../../Action/AddPerLevelModifierToLifePoints';
import {FixedModifier} from '../../../Modifier/FixedModifier/FixedModifier';
import {PerLevelModifier} from '../../../Modifier/PerLevelModifier/PerLevelModifier';
import {BuildingSheet} from '../../../Sheet';
import {Transaction} from '../../../Sheet/Transaction';
import {RaceAbilityName} from '../../RaceAbilityName';
import {RaceName} from '../../RaceName';
import {HardAsRock} from './HardAsRock';

describe('HardAsRock', () => {
	let sheet: BuildingSheet;
	let transaction: Transaction;

	beforeEach(() => {
		sheet = new BuildingSheet();
		transaction = new Transaction(sheet);
	});

	it('should dispatch addOtherModifierToLifePoints', () => {
		const hardAsRock = new HardAsRock();
		hardAsRock.addToSheet(transaction, RaceName.dwarf);
		const lifePointsModifier = sheet.getSheetLifePoints().getFixedModifiers().get(RaceAbilityName.hardAsRock);
		expect(lifePointsModifier).toBeDefined();
		expect(lifePointsModifier?.baseValue).toBe(3);
	});

	it('should dispatch addPerLevelModifierToLifePoints', () => {
		const hardAsRock = new HardAsRock();

		hardAsRock.addToSheet(transaction, RaceName.dwarf);
		const lifePointsModifier = sheet.getSheetLifePoints().getPerLevelModifiers().get(RaceAbilityName.hardAsRock);
		expect(lifePointsModifier).toBeDefined();
		expect(lifePointsModifier?.baseValue).toBe(1);
		expect(lifePointsModifier?.includeFirstLevel).toBe(false);
	});
});
