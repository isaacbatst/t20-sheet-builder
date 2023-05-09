import type {SheetInterface} from '../../Sheet/SheetInterface';
import type {RequirementInterface} from '../Power';

export abstract class Requirement implements RequirementInterface {
	abstract readonly description: string;

	abstract verify(sheet: SheetInterface): boolean;
	protected abstract getDescription(): string;
}
