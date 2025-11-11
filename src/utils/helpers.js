// Fonctions utilitaires

// Formater la date
export const formatDate = (timestamp) => {
  if (!timestamp) return '';
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  const now = new Date();
  const diff = now - date;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 7) {
    return date.toLocaleDateString('fr-DZ', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  } else if (days > 0) {
    return `Il y a ${days} jour${days > 1 ? 's' : ''}`;
  } else if (hours > 0) {
    return `Il y a ${hours} heure${hours > 1 ? 's' : ''}`;
  } else if (minutes > 0) {
    return `Il y a ${minutes} minute${minutes > 1 ? 's' : ''}`;
  } else {
    return 'À l\'instant';
  }
};

// Formater le prix
export const formatPrice = (price) => {
  if (!price) return '0 DZD';
  return new Intl.NumberFormat('fr-DZ', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price) + ' DZD';
};

// Tronquer le texte
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Valider l'email
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Valider le téléphone algérien
export const validatePhone = (phone) => {
  const re = /^(0|\+213)[5-7][0-9]{8}$/;
  return re.test(phone.replace(/\s/g, ''));
};

// Générer un ID unique
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

