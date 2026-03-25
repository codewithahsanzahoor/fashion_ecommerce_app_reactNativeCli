export const mockUser = {
  id: 'u1',
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
};

export const mockProducts = [
  {
    id: 'p1',
    name: 'Jacket Jeans',
    price: 32.9,
    size: 'L',
    color: '#2E86C1', // Blue
    image: 'https://images.unsplash.com/photo-1617114919297-3c8ddb01f599?q=80&w=687&auto=format&fit=crop',
    isFavorite: true,
  },
  {
    id: 'p2',
    name: 'Acrylic Sweater',
    price: 35.9,
    size: 'M',
    color: '#E96E6E', // Red/Pink
    image: 'https://plus.unsplash.com/premium_photo-1669688174622-0393f5c6baa2?q=80&w=764&auto=format&fit=crop',
    isFavorite: true,
  },
  {
    id: 'p3',
    name: 'Stylish Coat',
    price: 65.9,
    size: 'M',
    color: '#A9B8C5', // Greyish
    image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=1000&auto=format&fit=crop',
    isFavorite: false,
  },
  {
    id: 'p4',
    name: 'Leather Jacket',
    price: 89.9,
    size: 'XL',
    color: '#000000', // Black
    image: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?q=80&w=1000&auto=format&fit=crop',
    isFavorite: false,
  }
];

export const mockOrders = [
  {
    id: 'ord_123',
    date: '2026-03-20',
    total: 68.8,
    status: 'Delivered', // Cannot be cancelled
    items: [mockProducts[0], mockProducts[1]]
  },
  {
    id: 'ord_124',
    date: '2026-03-24',
    total: 65.9,
    status: 'Pending', // Editable / Cancellable
    items: [mockProducts[2]]
  }
];
