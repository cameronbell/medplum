export declare const MEDPLUM_RELEASES_URL = "https://meta.medplum.com/releases";
export type ReleaseManifest = {
    tag_name: string;
    assets: {
        name: string;
        browser_download_url: string;
    }[];
};
/**
 * Clears the locally-cached `ReleaseManifest`s for all versions.
 */
export declare function clearReleaseCache(): void;
/**
 * Asserts that a given candidate is a `ReleaseManifest`.
 * @param candidate - An object assumed to be a `ReleaseManifest`.
 */
export declare function assertReleaseManifest(candidate: unknown): asserts candidate is ReleaseManifest;
/**
 * Fetches the manifest for a given Medplum release version.
 * @param appName - The name of the app to fetch the manifest for.
 * @param version - The version to fetch. If no `version` is provided, defaults to the `latest` version.
 * @param params - An optional list of key-value pairs to be appended to the URL query string.
 * @returns - The manifest for the specified or latest version.
 */
export declare function fetchVersionManifest(appName: string, version?: string, params?: Record<string, string>): Promise<ReleaseManifest>;
/**
 * Tests that a given version string follows the basic semver pattern of `<int>.<int>.<int>`, which is used for Medplum versions.
 *
 * @param version - A version string that should be tested for valid semver semantics.
 * @returns `true` if `version` is a valid semver version that conforms to the Medplum versioning system, otherwise `false`.
 */
export declare function isValidMedplumSemver(version: string): boolean;
/**
 * Tests that a given version string is a valid existing Medplum release version.
 * @param appName - The name of the app to check the version for.
 * @param version - A version to be checked against the existing Medplum repo releases.
 * @returns `true` if `version` is a valid semver version that corresponds to an existing release, otherwise `false`.
 */
export declare function checkIfValidMedplumVersion(appName: string, version: string): Promise<boolean>;
/**
 * Fetches the latest Medplum release version string.
 * @param appName - The name of the app to fetch the latest version for.
 * @returns A version string corresponding to the latest Medplum release version.
 */
export declare function fetchLatestVersionString(appName: string): Promise<string>;
/**
 * Checks if a newer version of Medplum is available and logs a warning if so.
 * @param appName - The name of the app to check the version for.
 * @param params - An optional list of key-value pairs to be appended to the URL query string.
 */
export declare function warnIfNewerVersionAvailable(appName: string, params?: Record<string, string>): Promise<void>;
//# sourceMappingURL=version-utils.d.ts.map