import * as pulumi from "@pulumi/pulumi";

export interface TagData {
    name: string;
    description: string;
}

// All mappers should receive a json of type T and return a type U
interface Mapper<T, U> {
    (json: T): U;
  }
  
// We decalre the mapper of user, should receive a TagData (T) and returns an Tags (U)
type mapTag = Mapper<TagData, pulumi.Input<{ [key: string]: pulumi.Input<string>; }>>;

export function mapTag(json: TagData): pulumi.Input<{ [key: string]: pulumi.Input<string>; }> {
    return {
        Name: json.name,
        Description: json.description,
        Env: pulumi.getStack()
    };
}