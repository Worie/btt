/**
 * Deletes the trigger of given uuid
 * @param uuid 
 */
export function deleteTrigger(uuid: string): void {
  window.location.href = `btt://delete_trigger/?uuid=${uuid}`;
}