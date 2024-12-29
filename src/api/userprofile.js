import instance from "./index";

// Mock user data (since we don't have a real backend for users yet)
export const mockUsers = [
  {
    id: 1,
    username: "Hamadk",
    password: "123456",
    fullName: "Hamad khalid",
    email: "hamad@example.com",
    phone: "55012890",
    address: "1 St, Sabah salem, block 12",
    image: "https://thumbs.dreamstime.com/b/faceless-businessman-avatar-man-suit-blue-tie-human-profile-userpic-face-features-web-picture-gentlemen-85824471.jpg",
    orders: [
      {
        id: 1,
        date: "2024-03-20",
        restaurantName: "Pasta Paradise",
        items: [
          { name: "Spaghetti Carbonara", quantity: 1, price: 12.99 },
          { name: "Margherita Pizza", quantity: 1, price: 10.99 },
          { name: "Tiramisu", quantity: 1, price: 6.99 }
        ],
        total: 30.97
      },
      {
        id: 2,
        date: "2024-03-18",
        restaurantName: "Wok Express",
        items: [
          { name: "Kung Pao Chicken", quantity: 1, price: 13.99 },
          { name: "Spring Rolls", quantity: 2, price: 5.99 }
        ],
        total: 25.97
      }
    ]
  },
  {
    id: 2,
      username: "Salma",
    password: "123456",
    fullName: "Salma thamer",
    email: "salma@example.com",
    phone: "99501189",
    address: "1 St, salwa, block 3",
    image: "https://png.pngtree.com/png-vector/20220807/ourmid/pngtree-dark-skin-women-avatar-wearing-blue-suit-png-image_6102784.png",
    orders: [
      {
        id: 3,
        date: "2024-03-21",
        restaurantName: "Taco Town",
        items: [
          { name: "Beef Tacos", quantity: 2, price: 8.99 },
          { name: "Chicken Quesadilla", quantity: 1, price: 9.99 },
          { name: "Churros", quantity: 2, price: 4.99 }
        ],
        total: 37.95
      }
    ]
  },
  {
    id: 3,
    username: "Majed",
    password: "123456",
    fullName: "Majed salem",
    email: "majed@example.com",
    phone: "55012893",
    address: "1 St, abdullah al-salem, block 6",
    image: "https://static.vecteezy.com/system/resources/thumbnails/015/413/618/small/elegant-man-in-business-suit-with-badge-man-business-avatar-profile-picture-illustration-isolated-vector.jpg",
    orders: [
      {
        id: 4,
        date: "2024-03-22",
        restaurantName: "Spice Route",
        items: [
          { name: "Butter Chicken", quantity: 1, price: 15.99 },
          { name: "Paneer Tikka", quantity: 1, price: 12.99 },
          { name: "Gulab Jamun", quantity: 2, price: 5.99 }
        ],
        total: 40.96
      },
      {
        id: 5,
        date: "2024-03-19",
        restaurantName: "T-Grill",
        items: [
          { name: "Machboos", quantity: 1, price: 17.99 },
          { name: "Kebab Skewers", quantity: 2, price: 14.99 }
        ],
        total: 47.97
      }
    ]
  },
  {
    id: 4,
    username: "Farah",
    password: "123456",
    fullName: "Farah mohammed",
    email: "farah@example.com",
    phone: "55012892",
    address: "1 St, rumaithiya, block 2",
    image: "https://static.vecteezy.com/system/resources/previews/025/669/125/non_2x/businesswoman-confident-business-successful-clipart-illustration-design-vector.jpg",
    orders: [
      {
        id: 6,
        date: "2024-03-23",
        restaurantName: "Pasta Paradise",
        items: [
          { name: "Margherita Pizza", quantity: 2, price: 10.99 },
          { name: "Tiramisu", quantity: 1, price: 6.99 }
        ],
        total: 28.97
      },
      {
        id: 7,
        date: "2024-03-21",
        restaurantName: "Wok Express",
        items: [
          { name: "Sweet and Sour Chicken", quantity: 1, price: 14.99 },
          { name: "Spring Rolls", quantity: 2, price: 5.99 }
        ],
        total: 26.97
      },
      {
        id: 8,
        date: "2024-03-20",
        restaurantName: "T-Grill",
        items: [
          { name: "Machboos", quantity: 1, price: 17.99 },
          { name: "Dates Pudding", quantity: 2, price: 6.99 }
        ],
        total: 31.97
      }
    ]
  }
];

// Get current user profile
export const getCurrentUser = () => {
  // For now, return the first mock user
  return mockUsers[0];
};
