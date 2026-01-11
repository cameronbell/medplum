import type { AccessPolicy, AccessPolicyResource, Resource, ResourceType } from '@medplum/fhirtypes';
/**
 * Protected resource types are in the "medplum" project.
 * Reading and writing is limited to the system account.
 */
export declare const protectedResourceTypes: string[];
/**
 * Project admin resource types are special resources that are only
 * accessible to project administrators.
 */
export declare const projectAdminResourceTypes: string[];
/**
 * Interactions with a resource that can be controlled via an access policy.
 *
 * Codes taken from http://hl7.org/fhir/codesystem-restful-interaction.html
 */
export declare const AccessPolicyInteraction: {
    readonly READ: "read";
    readonly VREAD: "vread";
    readonly UPDATE: "update";
    readonly DELETE: "delete";
    readonly HISTORY: "history";
    readonly CREATE: "create";
    readonly SEARCH: "search";
};
export type AccessPolicyInteraction = (typeof AccessPolicyInteraction)[keyof typeof AccessPolicyInteraction];
export declare const readInteractions: AccessPolicyInteraction[];
/**
 * Determines if the current user can read the specified resource type.
 * @param accessPolicy - The access policy.
 * @param resourceType - The resource type.
 * @returns True if the current user can read the specified resource type.
 * @deprecated Use accessPolicySupportsInteraction() instead.
 */
export declare function canReadResourceType(accessPolicy: AccessPolicy, resourceType: ResourceType): boolean;
/**
 * Determines if the current user can write the specified resource type.
 * This is a preliminary check before evaluating a write operation in depth.
 * If a user cannot write a resource type at all, then don't bother looking up previous versions.
 * @param accessPolicy - The access policy.
 * @param resourceType - The resource type.
 * @returns True if the current user can write the specified resource type.
 * @deprecated Use accessPolicySupportsInteraction() instead.
 */
export declare function canWriteResourceType(accessPolicy: AccessPolicy, resourceType: ResourceType): boolean;
/**
 * Shallow check that an interaction is permitted by the AccessPolicy on a given resource type,
 * at least for some resources.  A more in-depth check for the specific resource(s) being accessed
 * is required in addition to this one.
 * @param accessPolicy - The AccessPolicy to check against.
 * @param interaction - The FHIR interaction being performed.
 * @param resourceType - The type of resource being interacted with.
 * @returns True when the interaction is provisionally permitted by the AccessPolicy.
 */
export declare function accessPolicySupportsInteraction(accessPolicy: AccessPolicy, interaction: AccessPolicyInteraction, resourceType: ResourceType): boolean;
/**
 * Determines if the current user can write the specified resource.
 * This is a more in-depth check after building the candidate result of a write operation.
 * @param accessPolicy - The access policy.
 * @param resource - The resource.
 * @returns True if the current user can write the specified resource type.
 * @deprecated Use satisfiedAccessPolicy() instead.
 */
export declare function canWriteResource(accessPolicy: AccessPolicy, resource: Resource): boolean;
/**
 * Checks that there is an access policy permitting the given resource interaction, returning the matching policy object.
 * @param resource - The resource being acted upon.
 * @param interaction - The interaction being performed on the resource.
 * @param accessPolicy - The relevant access policy for the current user.
 * @returns The satisfied access policy, or undefined if the access policy does not permit the given interaction.
 */
export declare function satisfiedAccessPolicy(resource: Resource, interaction: AccessPolicyInteraction, accessPolicy: AccessPolicy | undefined): AccessPolicyResource | undefined;
//# sourceMappingURL=access.d.ts.map