BEGIN;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email text NOT NULL UNIQUE,
    nickname text NOT NULL ,
    password text NOT NULL ,
    image text[],
    provider text DEFAULT local,
    providerId text,
    createdAt TIMESTAMPTZ DEFAULT NOW(),
    updatedAt TIMESTAMPTZ DEFAULT NOW(),
  )

CREATE TABLE articles (
  id VARCHAR(50) PRIMARY KEY,
  user_id INTEGER NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  image text[],
  likecount INTEGER DEFAULT 0,
  createdAt TIMESTAMPTZ DEFAULT NOW(),
  updatedAt TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT title_length CHECK (LENGTH(title) <= 10),
  CONSTRAINT content_length CHECK (LENGTH(content) > 10),
  FOREIGN KEY (user_id) REFERENCES users (id),
)

CREATE TABLE products (
  id VARCHAR(50) PRIMARY KEY,
  user_id INTEGER NOT NULL,
  images text[] NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  price INTEGER NOT NULL,
  likecount INTEGER DEFAULT 0,
  createdAt TIMESTAMPTZ DEFAULT NOW(),
  updatedAt TIMESTAMPTZ DEFAULT NOW(), 
  FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT title_length CHECK (LENGTH(title) <= 10),
  CONSTRAINT content_length CHECK (LENGTH(content) > 10),
)

CREATE TABLE comments (
  id VARCHAR(50) PRIMARY KEY,
  user_id INTEGER NOT NULL,
  product_id VARCHAR(50),
  article_id VARCHAR(50),
  content text NOT NULL,
  createdAt TIMESTAMPTZ DEFAULT NOW(),
  updatedAt TIMESTAMPTZ DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (product_id) REFERENCES products (id),
  FOREIGN KEY (article_id) REFERENCES articles (id),
  CONSTRAINT content_length CHECK (LENGTH(content) > 5),
)

CREATE TABLE likes (
  id VARCHAR(50) PRIMARY KEY,
  createdAt TIMESTAMPTZ DEFAULT NOW(),
  updatedAt TIMESTAMPTZ DEFAULT NOW(),
)

CREATE TABLE articlelikes (
  article_id VARCHAR(50) NOT NULL,
  like_id VARCHAR(50) NOT NULL,
  user_id INTEGER NOT NULL,
  PRIMARY KEY (article_id, like_id, user_id),
  FOREIGN KEY (article_id) REFERENCES articles (id),
  FOREIGN KEY (like_id) REFERENCES likes (id),
  FOREIGN KEY (user_id) REFERENCES users (id),
)

CREATE TABLE productlikes (
  product_id VARCHAR(50) NOT NULL,
  like_id VARCHAR(50) NOT NULL,
  user_id INTEGER NOT NULL,
  PRIMARY KEY (product_id, like_id, user_id),
  FOREIGN KEY (product_id) REFERENCES products (id),
  FOREIGN KEY (like_id) REFERENCES likes (id),
  FOREIGN KEY (user_id) REFERENCES users (id),
)

CREATE TABLE tags (
  id VARCHAR(50) PRIMARY KEY,
  content text NOT NULL,
  createdAt TIMESTAMPTZ DEFAULT NOW(),
  updatedAt TIMESTAMPTZ DEFAULT NOW(),
)

CREATE TABLE producttags (
  product_id VARCHAR(50) NOT NULL,
  tag_id VARCHAR(50) NOT NULL,
  PRIMARY KEY (product_id, tag_id),
  FOREIGN KEY (product_id) REFERENCES products (id),
  FOREIGN KEY (tag_id) REFERENCES tags (id),
)

CREATE TABLE articletags (
  article_id VARCHAR(50) NOT NULL,
  tag_id VARCHAR(50) NOT NULL,
  PRIMARY KEY (article_id, tag_id),
  FOREIGN KEY (article_id) REFERENCES articles (id),
  FOREIGN KEY (tag_id) REFERENCES tags (id),
)

CREATE TABLE reservations (
  id VARCHAR(50) PRIMARY KEY,
  createdAt TIMESTAMPTZ DEFAULT NOW(),
  updatedAt TIMESTAMPTZ DEFAULT NOW(),
  FOREIGN KEY user_id REFERENCES users (id), 
  FOREIGN KEY product_id REFERENCES products (id),
)

COMMIT;