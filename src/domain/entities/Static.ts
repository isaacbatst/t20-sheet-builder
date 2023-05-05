import {type EmptyObject} from '../../common/types/EmptyObject';
import {type UnknownObject} from '../../common/types/UnknownObject';

export type Static<
	Class,
	StaticMembers extends UnknownObject = EmptyObject,
	ConstructorArgs extends any[] = any[],
> = (new(...args: ConstructorArgs) => Class) & StaticMembers;
