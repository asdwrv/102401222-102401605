const KEY = 'lost_found_items';

function getAll() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  } catch (e) {
    return [];
  }
}

function saveAll(items) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

function add(item) {
  const arr = getAll();
  arr.push(item);
  saveAll(arr);
  return item;
}

function getById(id) {
  return getAll().find(i => i.id === id) || null;
}

function updateItem(id, patch) {
  const arr = getAll();
  const i = arr.findIndex(x => x.id === id);
  if (i === -1) return false;
  arr[i] = Object.assign({}, arr[i], patch);
  saveAll(arr);
  return true;
}

function removeItem(id) {
  const arr = getAll().filter(x => x.id !== id);
  saveAll(arr);
}

function stats() {
  const arr = getAll();
  const done = arr.filter(i => i.status === 'done').length;
  return { total: arr.length, open: arr.length - done, done };
}

if (typeof module !== 'undefined') {
  module.exports = { KEY, getAll, saveAll, add, getById, updateItem, removeItem, stats };
}