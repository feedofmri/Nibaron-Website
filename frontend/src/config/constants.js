// Application constants for Nibaron Bazaar
export const APP_NAME = 'Nibaron Bazaar';
export const APP_DESCRIPTION = 'স্মার্ট কৃষি বাজার - AI-Powered Crop Predictions, Pre-Order Future Harvests';

export const ROLES = {
  BUYER: 'buyer',
  SELLER: 'seller',
  FARMER: 'farmer',
  ADMIN: 'admin',
};

export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  PARTIAL: 'partial',
  REFUNDED: 'refunded',
  FAILED: 'failed',
};

export const PAYMENT_METHODS = {
  BANK_TRANSFER: 'bank_transfer',
  BKASH: 'bkash',
  NAGAD: 'nagad',
  CASH_ON_DELIVERY: 'cod',
};

export const CROP_TYPES = {
  RICE: 'rice',
  WHEAT: 'wheat',
  POTATO: 'potato',
  ONION: 'onion',
  GARLIC: 'garlic',
  TOMATO: 'tomato',
  CABBAGE: 'cabbage',
  CAULIFLOWER: 'cauliflower',
  EGGPLANT: 'eggplant',
  CARROT: 'carrot',
  BEANS: 'beans',
  LENTILS: 'lentils',
};

export const CROP_ICONS = {
  [CROP_TYPES.RICE]: '🌾',
  [CROP_TYPES.WHEAT]: '🌾',
  [CROP_TYPES.POTATO]: '🥔',
  [CROP_TYPES.ONION]: '🧅',
  [CROP_TYPES.GARLIC]: '🧄',
  [CROP_TYPES.TOMATO]: '🍅',
  [CROP_TYPES.CABBAGE]: '🥬',
  [CROP_TYPES.CAULIFLOWER]: '🥦',
  [CROP_TYPES.EGGPLANT]: '🍆',
  [CROP_TYPES.CARROT]: '🥕',
  [CROP_TYPES.BEANS]: '🫘',
  [CROP_TYPES.LENTILS]: '🫛',
};

export const QUALITY_GRADES = {
  A_PLUS: 'A+',
  A: 'A',
  B: 'B',
  C: 'C',
};

export const BANGLADESH_DISTRICTS = [
  'Dhaka', 'Chittagong', 'Rajshahi', 'Khulna', 'Barisal', 'Sylhet', 'Rangpur', 'Mymensingh',
  'Comilla', 'Gazipur', 'Narayanganj', 'Tangail', 'Brahmanbaria', 'Kishoreganj', 'Manikganj',
  'Munshiganj', 'Narsingdi', 'Shariatpur', 'Faridpur', 'Gopalganj', 'Madaripur', 'Rajbari',
  'Cox\'s Bazar', 'Feni', 'Lakshmipur', 'Noakhali', 'Bandarban', 'Khagrachhari', 'Rangamati',
  'Bogra', 'Joypurhat', 'Naogaon', 'Natore', 'Chapainawabganj', 'Pabna', 'Sirajganj',
  'Bagerhat', 'Chuadanga', 'Jessore', 'Jhenaidah', 'Kushtia', 'Magura', 'Meherpur', 'Narail', 'Satkhira',
  'Barguna', 'Bhola', 'Jhalokati', 'Patuakhali', 'Pirojpur',
  'Habiganj', 'Moulvibazar', 'Sunamganj',
  'Dinajpur', 'Gaibandha', 'Kurigram', 'Lalmonirhat', 'Nilphamari', 'Panchagarh', 'Thakurgaon',
  'Jamalpur', 'Netrokona', 'Sherpur'
];

export const NOTIFICATION_TYPES = {
  ORDER_UPDATE: 'order_update',
  PREORDER_ALERT: 'preorder_alert',
  COMMUNITY_REPLY: 'community_reply',
  SYSTEM_ALERT: 'system_alert',
  PRICE_CHANGE: 'price_change',
  QUALITY_UPDATE: 'quality_update',
  WEATHER_ALERT: 'weather_alert',
};

export const POST_TYPES = {
  DISCUSSION: 'discussion',
  BUYING_REQUEST: 'buying_request',
  ANNOUNCEMENT: 'announcement',
};

export const FILE_TYPES = {
  IMAGE: ['jpg', 'jpeg', 'png', 'webp', 'svg'],
  DOCUMENT: ['pdf', 'doc', 'docx', 'xls', 'xlsx'],
};

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const MAX_IMAGES = 10;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
};

export const CURRENCY = {
  SYMBOL: '৳',
  CODE: 'BDT',
  NAME: 'Bangladeshi Taka',
};

export const LANGUAGE_OPTIONS = [
  { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
];

export const THEME_OPTIONS = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'auto', label: 'Auto' },
];

export const DEFAULT_AVATAR = '/assets/images/placeholders/profile-placeholder.jpg';
export const DEFAULT_PRODUCT_IMAGE = '/assets/images/placeholders/product-placeholder.jpg';
