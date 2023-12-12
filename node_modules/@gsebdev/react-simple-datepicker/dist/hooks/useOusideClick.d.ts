import { RefObject } from "react";
/**
 * Custom hook that listens for a click outside of a provided element when opened
 *
 * @param {Object} ref - Ref object to the element being watched for clicks outside of
 * @param {Function} callback - Function to call when a click outside of the provided element is detected
 * @param {Boolean} opened - Determines whether or not the event listener should be active
 * @returns {void}
 */
declare const useOutsideClick: (ref: RefObject<HTMLElement>, callback: () => void, opened: boolean) => void;
export default useOutsideClick;
