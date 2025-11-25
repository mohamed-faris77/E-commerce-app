// utils/cart.js
export const getCartKey = () => {
  try {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    if (user && (user.id || user._id || user.email)) {
      const id = user.id || user._id || user.email;
      return `cart_${id}`;
    }
  } catch (err) {
    // ignore parse errors
  }
  return 'cart_guest';
};

export const readCart = () => {
  const key = getCartKey();
  try {
    return JSON.parse(localStorage.getItem(key) || '[]');
  } catch (err) {
    return [];
  }
};

export const writeCart = (cart) => {
  const key = getCartKey();
  localStorage.setItem(key, JSON.stringify(cart));
  // Dispatch a CustomEvent with the updated cart count for immediate UI updates
  const count = (cart || []).reduce((acc, item) => acc + Number(item.qty || 0), 0);
  try {
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { count } }));
  } catch (err) {
    window.dispatchEvent(new Event('cartUpdated'));
  }
};

export const clearCart = () => {
  const key = getCartKey();
  localStorage.removeItem(key);
  try {
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { count: 0 } }));
  } catch (err) {
    window.dispatchEvent(new Event('cartUpdated'));
  }
};

export const migrateCartOnLogin = (userId) => {
  // If a guest cart exists, optionally merge it into user's cart on login.
  // Simple behavior: if user has no existing cart, move guest cart to user cart.
  try {
    const guest = JSON.parse(localStorage.getItem('cart_guest') || '[]');
    const userKey = `cart_${userId}`;
    const existing = JSON.parse(localStorage.getItem(userKey) || '[]');
    if (guest.length > 0 && existing.length === 0) {
      localStorage.setItem(userKey, JSON.stringify(guest));
      localStorage.removeItem('cart_guest');
      try {
        const count = guest.reduce((acc, item) => acc + Number(item.qty || 0), 0);
        window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { count } }));
      } catch (err) {
        window.dispatchEvent(new Event('cartUpdated'));
      }
    }
  } catch (err) {
    // ignore
  }
};
