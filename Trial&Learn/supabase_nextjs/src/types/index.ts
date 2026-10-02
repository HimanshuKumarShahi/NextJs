export type ShoeCategory = "running" | "basketball" | "lifestyle" | "skateboarding" | "training";
export type ShoeGender = "men" | "women" | "unisex";
export type ShoeBrand = "Nike" | "Jordan" | "Adidas" | "New Balance" | "Puma" | "Yeezy";

export interface ShoeColor {
  name: string;
  hex: string;
}

export interface ShoeReview {
  id: string;
  userName: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface Shoe {
  id: string;
  name: string;
  slug: string;
  brand: ShoeBrand;
  category: ShoeCategory;
  gender: ShoeGender;
  price: number;
  originalPrice?: number;
  images: string[];
  description: string;
  details: {
    cushioning: string;
    upper: string;
    sole: string;
    sku: string;
    releaseYear: number;
  };
  colors: ShoeColor[];
  sizes: number[]; // US sizes, e.g. 7, 7.5, 8, 8.5...
  inStock: boolean;
  stockCount?: number;
  isNew?: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  rating: number;
  reviewCount: number;
  reviews?: ShoeReview[];
}

export interface CartItem {
  id: string; // unique combo of shoeId-size-color
  shoeId: string;
  shoe: Shoe;
  size: number;
  color: string;
  quantity: number;
  price: number;
}

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  id: string;
  createdAt: string;
  status: OrderStatus;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: "card" | "upi" | "paypal" | "cod";
  subtotal: number;
  discount: number;
  discountCode?: string;
  shippingFee: number;
  tax: number;
  total: number;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

export type NotificationType = "order" | "drop" | "promo" | "system";

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: string;
  link?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  phone?: string;
  address?: Partial<ShippingAddress>;
  createdAt: string;
}

export interface ShoeFilterState {
  search: string;
  brand: string;
  category: string;
  gender: string;
  minPrice: number;
  maxPrice: number;
  size: number | null;
  sortBy: "featured" | "newest" | "price-asc" | "price-desc" | "rating";
}
