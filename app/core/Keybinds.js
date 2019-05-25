// @flow
import Mousetrap from 'mousetrap';
import getLogger from './Logger';

const logKb = getLogger('Keybinds');

const currentKeybinds = {};

// Register key handler
// Mousetrap.prototype.handleKey = (char, modifiers, e: Event) => {
//   console.log(char);
//   console.log(modifiers);
//   console.log(e);
// };

function getKeybinds(): currentKeybinds {
  return currentKeybinds;
}

function setKeybind(
  key: string,
  callback: () => void,
  overwrite?: boolean = false
) {
  // Check if the key bind already exists
  if (
    Object.prototype.hasOwnProperty.call(currentKeybinds, key) &&
    !overwrite
  ) {
    logKb.error(`Key '${key}' is already registered!`);
    return;
  }

  // Set the key bind
  Mousetrap.bind(key, callback);
  currentKeybinds[key] = callback;
}

function removeKeybind(key: string, silent?: boolean = false) {
  if (!Object.prototype.hasOwnProperty.call(currentKeybinds, key) && !silent) {
    logKb.warn(`Key ${key} is not bound, can't remove.`);
  }

  Mousetrap.unbind(key);
}

export { getKeybinds, setKeybind, removeKeybind };
