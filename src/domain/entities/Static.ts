
export type Static<
	Class,
	StaticMembers extends object = object,
	ConstructorArgs extends any[] = any[],
> = (new(...args: ConstructorArgs) => Class) & StaticMembers;
