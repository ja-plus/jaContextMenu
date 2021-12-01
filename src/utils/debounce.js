/**
 * debounce
 * @param {Function} func function
 * @param {Number} delay ms default 200ms
 * @param {Boolean} immediate is immediate run function default false
 * @returns {Function}
 */
export default function debounce(func, delay = 200, immediate){
    let timeout = null;
    return function(...param){
        if (timeout) return;
        if (immediate) func && func(...param);
        timeout = setTimeout(() => {
            if (!immediate) func && func(...param);
            timeout = null;
        }, delay);
    }
}