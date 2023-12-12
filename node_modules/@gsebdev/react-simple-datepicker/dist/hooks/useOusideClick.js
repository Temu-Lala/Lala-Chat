"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
/**
 * Custom hook that listens for a click outside of a provided element when opened
 *
 * @param {Object} ref - Ref object to the element being watched for clicks outside of
 * @param {Function} callback - Function to call when a click outside of the provided element is detected
 * @param {Boolean} opened - Determines whether or not the event listener should be active
 * @returns {void}
 */
var useOutsideClick = function (ref, callback, opened) {
    (0, react_1.useEffect)(function () {
        //click handler function
        var handleClick = function (e) {
            if (ref.current) {
                var rect = ref.current.getBoundingClientRect();
                //use event mouse position and bouding rect of element to determine if outside or not
                var outside = e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom ? true : false;
                // if the click is outside then call the callback function
                if (outside) {
                    callback();
                }
            }
        };
        // if element is opened, add the eventlistener for a click anywhere in the document
        if (opened) {
            setTimeout(function () { document.addEventListener('click', handleClick); });
            // if not opened remove the event listener
        }
        else {
            document.removeEventListener('click', handleClick);
        }
        // when the component unmouts, remove the event listener
        return function () {
            document.removeEventListener('click', handleClick);
        };
    }, [ref, callback, opened]);
};
exports.default = useOutsideClick;
