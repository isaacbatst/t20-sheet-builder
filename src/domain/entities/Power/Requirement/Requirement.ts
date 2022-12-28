import type {SheetBaseInterface} from '../../Sheet/SheetBaseInterface';
import type {RequirementInterface} from '../Power';

export abstract class Requirement implements RequirementInterface {
	abstract readonly description: string;

	abstract verify(sheet: SheetBaseInterface): boolean;
	protected abstract getDescription(): string;
}
