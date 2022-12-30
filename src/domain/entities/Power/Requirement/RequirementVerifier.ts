import type {Requirement} from './Requirement';

export abstract class RequirementVerifier {
	abstract verify(requirement: Requirement): boolean;
}
