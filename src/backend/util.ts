import { execSync } from 'child_process';

/**
 * Returns mdls name using mdls command (backend dependant)
 * @param applicationPath 
 */
export function getMdlsName(applicationPath: string): string {
  const mdlsName: string = execSync(`mdls -name kMDItemCFBundleIdentifier -r ${applicationPath}`).toString();
  return mdlsName;
}

/**
 * Deletes the trigger of given ID. Will set the BetterTouchTool to focus, unfortunately
 * @param uuid 
 */
export function deleteTrigger(uuid: string): void {
  execSync(`open 'btt://delete_trigger/?uuid=${uuid}'`);
}