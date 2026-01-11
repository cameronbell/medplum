import type { Coding, Patient, Practitioner, PractitionerRole, RelatedPerson, Resource } from '@medplum/fhirtypes';
import type { MedplumClient } from './client';
import type { WithId } from './utils';
/**
 * CDS Service definition.
 * See {@link https://cds-hooks.hl7.org/#response | CDS Hooks Discovery} for full details.
 */
export interface CdsService {
    readonly id: string;
    readonly hook: string;
    readonly title?: string;
    readonly description?: string;
    readonly usageRequirements?: string;
    readonly prefetch?: Record<string, string>;
}
/**
 * CDS Discovery Response definition.
 * See {@link https://cds-hooks.hl7.org/#discovery | CDS Hooks Discovery} for full details.
 */
export interface CdsDiscoveryResponse {
    readonly services: CdsService[];
}
/**
 * CDS Request definition.
 * See {@link https://cds-hooks.hl7.org/#http-request-1 | Calling a CDS Service} for full details.
 */
export interface CdsRequest {
    readonly hook: string;
    readonly hookInstance: string;
    readonly context: Record<string, unknown>;
    readonly prefetch?: Record<string, unknown>;
}
/**
 * CDS FHIR Authorization definition.
 */
export interface CdsFhirAuthorization {
    readonly access_token: string;
    readonly token_type: string;
    readonly expires_in?: number;
    readonly scope?: string;
    readonly subject?: string;
}
/**
 * CDS Request with FHIR authorization.
 */
export interface CdsRequestWithAuth extends CdsRequest {
    readonly fhirServer: string;
    readonly fhirAuthorization: CdsFhirAuthorization;
}
/**
 * CDS Response definition.
 * See {@link https://cds-hooks.hl7.org/#cds-service-response | CDS Service Response} for full details.
 */
export interface CdsResponse {
    readonly cards: CdsCard[];
    readonly systemActions?: CdsAction[];
}
/**
 * CDS Card definition.
 * See {@link https://cds-hooks.hl7.org/#card-attributes | CDS Cards} for full details.
 */
export interface CdsCard {
    readonly uuid?: string;
    readonly summary: string;
    readonly detail?: string;
    readonly indicator: 'info' | 'warning' | 'hard-stop';
    readonly source?: CdsSource;
    readonly suggestions?: CdsSuggestion[];
    readonly links?: CdsLink[];
}
/**
 * CDS Source definition.
 * See {@link https://cds-hooks.hl7.org/#source | CDS Source} for full details.
 */
export interface CdsSource {
    readonly label: string;
    readonly url?: string;
    readonly icon?: string;
    readonly topic?: Coding;
}
/**
 * CDS Suggestion definition.
 * See {@link https://cds-hooks.hl7.org/#suggestion | CDS Suggestions} for full details.
 */
export interface CdsSuggestion {
    readonly label: string;
    readonly uuid?: string;
    readonly isRecommended?: boolean;
    readonly actions: CdsAction[];
}
/**
 * CDS Create Action.
 * See {@link https://cds-hooks.hl7.org/#actions | CDS Actions} for full details.
 */
export interface CdsCreateAction {
    readonly type: 'create';
    readonly description: string;
    readonly resource: Resource;
}
/**
 * CDS Update Action.
 * See {@link https://cds-hooks.hl7.org/#actions | CDS Actions} for full details.
 */
export interface CdsUpdateAction {
    readonly type: 'update';
    readonly description: string;
    readonly resource: Resource;
}
/**
 * CDS Delete Action.
 * See {@link https://cds-hooks.hl7.org/#actions | CDS Actions} for full details.
 */
export interface CdsDeleteAction {
    readonly type: 'delete';
    readonly description: string;
    readonly resourceId: string;
}
/**
 * CDS Action.
 * See {@link https://cds-hooks.hl7.org/#actions | CDS Actions} for full details.
 */
export type CdsAction = CdsCreateAction | CdsUpdateAction | CdsDeleteAction;
/**
 * CDS Link definition.
 * See {@link https://cds-hooks.hl7.org/#link | CDS Link} for full details.
 */
export interface CdsLink {
    readonly label: string;
    readonly url: string;
    readonly type: 'absolute' | 'smart' | 'relative';
    readonly appContext?: string;
    readonly autolaunchable?: boolean;
}
export type CdsUserResource = WithId<Patient | Practitioner | PractitionerRole | RelatedPerson>;
/**
 * Builds a CDS request.
 * @param medplum - The Medplum client.
 * @param user - The user resource.
 * @param service - The CDS service definition.
 * @param context - The CDS request context.
 * @returns The fully populated CDS request.
 */
export declare function buildCdsRequest(medplum: MedplumClient, user: CdsUserResource, service: CdsService, context: Record<string, unknown>): Promise<CdsRequest>;
/**
 * Replaces prefetch query variables with values from the context or user profile.
 *
 * A prefetch token is a placeholder in a prefetch template that is *replaced by information from the hook's context*
 * to construct the FHIR URL used to request the prefetch data.
 *
 * Prefetch tokens MUST be delimited by `{{` and `}}`, and MUST contain only the qualified path to a hook context field
 * or one of the following user identifiers: `userPractitionerId`, `userPractitionerRoleId`, `userPatientId`, or `userRelatedPersonId`.
 *
 * Note that the spec says:
 *
 *   Individual hooks specify which of their `context` fields can be used as prefetch tokens.
 *   Only root-level fields with a primitive value within the `context` object are eligible to be used as prefetch tokens.
 *   For example, `{{context.medication.id}}` is not a valid prefetch token because it attempts to access the `id` field of the `medication` field.
 *
 * Unfortunately, many CDS Hooks services do not follow this rule. Therefore, this implementation allows access to nested fields.
 *
 * @param user - The user resource.
 * @param context - The CDS request context.
 * @param query - The prefetch query template.
 * @returns The prefetch query with variables replaced.
 */
export declare function replaceQueryVariables(user: CdsUserResource, context: Record<string, unknown>, query: string): string;
//# sourceMappingURL=cds.d.ts.map