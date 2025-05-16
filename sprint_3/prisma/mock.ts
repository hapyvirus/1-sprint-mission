export const USER = [
  {
    email: "alice@example.com",
    nickname: "Alice",
    image: "https://example.com/avatar/alice.png",
    password: "password",
    refreshToken: "refresh-token-alice",
    provider: "local",
    providerId: null,
  },
  {
    email: "bob@example.com",
    nickname: "Bob",
    image: null,
    password: "password",
    refreshToken: null,
    provider: "local",
    providerId: null,
  },
  {
    email: "carol@example.com",
    nickname: "Carol",
    image: "https://example.com/avatar/carol.png",
    password: "password",
    refreshToken: "refresh-token-carol",
    provider: "local",
    providerId: null,
  },
];

export const PRODUCT = [
  {
    name: "Used iPhone 13",
    description: "A used iPhone 13 in good condition.",
    price: 500,
    images: [],
    tags: ["electronics", "phone"],
    authorId: 1,
    likeCount: 2,
    createdAt: "2025-02-27T09:00:00.000Z",
    updatedAt: "2025-02-27T09:00:00.000Z",
  },
  {
    name: "Sony PlayStation 5",
    description: "Brand new PS5, unopened box.",
    price: 600,
    images: [],
    tags: ["gaming", "console"],
    authorId: 2,
    likeCount: 1,
    createdAt: "2025-02-27T09:05:00.000Z",
    updatedAt: "2025-02-27T09:05:00.000Z",
  },
  {
    name: "Adidas Running Shoes",
    description: "Adidas shoes, brand new, size 9.",
    price: 70,
    images: [],
    tags: ["fashion", "shoes"],
    authorId: 3,
    likeCount: 0,
    createdAt: "2025-02-27T09:10:00.000Z",
    updatedAt: "2025-02-27T09:10:00.000Z",
  },
];

export const ARTICLE = [
  {
    title: "오늘 날씨 너무 좋아요",
    content: "산책하기 딱 좋은 날씨네요!",
    authorId: 1,
    likeCount: 1,
    images: "",
    createdAt: "2025-02-27T09:20:00.000Z",
    updatedAt: "2025-02-27T09:20:00.000Z",
  },
  {
    title: "캠핑 다녀왔어요",
    content: "자연 속에서의 하루는 정말 힐링이었어요.",
    authorId: 2,
    likeCount: 0,
    images: "",
    createdAt: "2025-02-27T09:25:00.000Z",
    updatedAt: "2025-02-27T09:25:00.000Z",
  },
  {
    title: "혼자 여행 추천",
    content: "제주도 혼자 여행 정말 좋았어요.",
    authorId: 3,
    likeCount: 2,
    images: "",
    createdAt: "2025-02-27T09:30:00.000Z",
    updatedAt: "2025-02-27T09:30:00.000Z",
  },
];

export const COMMENT = [
  {
    content: "아이폰 상태 진짜 좋아요!",
    productId: 1,
    articleId: null,
    authorId: 2,
    createdAt: "2025-02-27T10:00:00.000Z",
    updatedAt: "2025-02-27T10:00:00.000Z",
  },
  {
    content: "플스 완전 새거네요, 만족합니다.",
    productId: 2,
    articleId: null,
    authorId: 3,
    createdAt: "2025-02-27T10:05:00.000Z",
    updatedAt: "2025-02-27T10:05:00.000Z",
  },
  {
    content: "운동화 색상도 예쁘고 편해요!",
    productId: 3,
    articleId: null,
    authorId: 1,
    createdAt: "2025-02-27T10:10:00.000Z",
    updatedAt: "2025-02-27T10:10:00.000Z",
  },
  {
    content: "날씨 좋은 날엔 산책이 최고죠!",
    productId: null,
    articleId: 1,
    authorId: 3,
    createdAt: "2025-02-27T10:15:00.000Z",
    updatedAt: "2025-02-27T10:15:00.000Z",
  },
  {
    content: "캠핑 가고 싶어지네요~",
    productId: null,
    articleId: 2,
    authorId: 1,
    createdAt: "2025-02-27T10:20:00.000Z",
    updatedAt: "2025-02-27T10:20:00.000Z",
  },
  {
    content: "혼자 여행이라니 멋져요!",
    productId: null,
    articleId: 3,
    authorId: 2,
    createdAt: "2025-02-27T10:25:00.000Z",
    updatedAt: "2025-02-27T10:25:00.000Z",
  },
];

export const LIKE = [
  {
    authorId: 2,
    productId: 1,
    articleId: null,
    createdAt: "2025-02-28T09:00:00.000Z",
    updatedAt: "2025-02-28T09:00:00.000Z",
  },
  {
    authorId: 3,
    productId: 1,
    articleId: null,
    createdAt: "2025-02-28T09:05:00.000Z",
    updatedAt: "2025-02-28T09:05:00.000Z",
  },
  {
    authorId: 1,
    productId: 2,
    articleId: null,
    createdAt: "2025-02-28T09:10:00.000Z",
    updatedAt: "2025-02-28T09:10:00.000Z",
  },
  {
    authorId: 2,
    productId: null,
    articleId: 1,
    createdAt: "2025-02-28T09:15:00.000Z",
    updatedAt: "2025-02-28T09:15:00.000Z",
  },
  {
    authorId: 3,
    productId: null,
    articleId: 3,
    createdAt: "2025-02-28T09:20:00.000Z",
    updatedAt: "2025-02-28T09:20:00.000Z",
  },
  {
    authorId: 1,
    productId: null,
    articleId: 3,
    createdAt: "2025-02-28T09:25:00.000Z",
    updatedAt: "2025-02-28T09:25:00.000Z",
  },
];
export const NOTIFICATION = [
  {
    userId: 1,
    referenceId: 2,
    type: "LIKE",
    content: "Bob님이 당신의 상품 'Used iPhone 13'에 좋아요를 눌렀습니다.",
    isRead: false,
    createdAt: "2025-02-28T10:00:00.000Z",
    updatedAt: "2025-02-28T10:00:00.000Z",
  },
  {
    userId: 2,
    referenceId: 3,
    type: "COMMENT",
    content: "Carol님이 당신의 게시글 '캠핑 다녀왔어요'에 댓글을 남겼습니다.",
    isRead: false,
    createdAt: "2025-02-28T10:05:00.000Z",
    updatedAt: "2025-02-28T10:05:00.000Z",
  },
  {
    userId: 3,
    referenceId: 1,
    type: "LIKE",
    content: "Alice님이 당신의 게시글 '혼자 여행 추천'에 좋아요를 눌렀습니다.",
    isRead: true,
    createdAt: "2025-02-28T10:10:00.000Z",
    updatedAt: "2025-02-28T10:10:00.000Z",
  },
];

export const TAG = [
  {
    content: "Electronics",
  },
  {
    content: "Clothing",
  },
  {
    content: "Home Appliances",
  },
  {
    content: "Sports",
  },
  {
    content: "Books",
  },
  {
    content: "Health",
  },
  {
    content: "Toys",
  },
  {
    content: "Furniture",
  },
  {
    content: "Beauty",
  },
  {
    content: "Food",
  },
];

export const PRODUCTTAG = [
  {
    productId: 1,
    tagId: 1,
  },
  {
    productId: 2,
    tagId: 2,
  },
  {
    productId: 3,
    tagId: 3,
  },
  {
    productId: 1,
    tagId: 4,
  },
  {
    productId: 2,
    tagId: 5,
  },
  {
    productId: 3,
    tagId: 6,
  },
  {
    productId: 4,
    tagId: 7,
  },
  {
    productId: 5,
    tagId: 8,
  },
  {
    productId: 6,
    tagId: 9,
  },
  {
    productId: 7,
    tagId: 10,
  },
];
