import type {EffectExecution, SheetInterface} from './Sheet/SheetInterface';

export class EffectExecutionFake implements EffectExecution {
	execute = jest.fn();
}
