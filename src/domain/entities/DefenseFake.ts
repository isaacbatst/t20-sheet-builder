import type {DefenseInterface, ModifiersListInterface} from './BuildingSheetInterface';
import type {ContextInterface} from './Context';

export class DefenseFake implements DefenseInterface {
	total = 10;
	others: ModifiersListInterface = {add: jest.fn(), getMaxPossibleTotal: jest.fn(), getTotal: jest.fn(), modifiers: []};
	getTotal(dexterity: number, armorBonus: number, shieldBonus: number, context: ContextInterface): number {
		return this.total;
	}
}
