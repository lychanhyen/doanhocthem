const KEY = 'cart';
const EVENT_NAME = 'cart-changed';

export function getCart() {
  try {
    const data = JSON.parse(localStorage.getItem(KEY) || '[]');
    if (Array.isArray(data)) {
      return data;
    }
    return [];
  } catch (error) {
    return [];
  }
}

export function setCart(cart, source = 'unknown') {
  localStorage.setItem(KEY, JSON.stringify(cart));
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { source } }));
}

export function subscribeCart(callback) {
  window.addEventListener(EVENT_NAME, callback);
  window.addEventListener('storage', callback);
  return function unsubscribe() {
    window.removeEventListener(EVENT_NAME, callback);
    window.removeEventListener('storage', callback);
  };
}