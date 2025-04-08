-- 1. `orders` 테이블에서 모든 주문을 조회하세요.
SELECT * FROM orders;

-- 2. `orders`테이블에서 `id` 가 `423`인 주문을 조회하세요.
SELECT *
FROM orders
WHERE orders.id = 423;

-- 3. `orders` 테이블에서 총 주문 건수를 `total_orders`라는 이름으로 구하세요.
SELECT COUNT(id) AS total_orders
FROM orders

-- 4. `orders` 테이블에서 최신 순으로 주문을 조회하세요. (`date`, `time` 컬럼이 분리되어 있다는 점에 주의)
SELECT *
FROM orders
ORDER BY date DESC, time DESC;

-- 5. `orders` 테이블에서 오프셋 기반 페이지네이션된 목록을 조회합니다. 페이지 크기가 10이고 최신순일 때, 첫 번째 페이지를 조회하세요.SELECT *
SELECT *
FROM orders
ORDER BY date DESC, time DESC
LIMIT 10;

-- 6. `orders` 테이블에서 오프셋 기반 페이지네이션된 목록을 조회합니다. 페이지 크기가 10이고 최신순일 때 5번째 페이지를 조회하세요.
SELECT *
FROM orders
ORDER BY date DESC, time DESC
LIMIT 10
OFFSET 40;

-- 7. `orders` 테이블에서 커서 페이지네이션된 목록을 조회합니다. 페이지 크기가 10이고 최신순일때, `id` 값을 기준으로 커서를 사용합시다. 커서의 값이 `42`일 때 다음 페이지를 조회하세요.
SELECT *
FROM orders
WHERE id < 42
ORDER BY date DESC, time DESC
LIMIT 10;

-- 8. `orders` 테이블에서 2025년 3월에 주문된 내역만 조회하세요.
SELECT *
FROM orders
WHERE date >= '2025-03-01' AND date <'2025-04-01';


-- 9. `orders` 테이블에서 2025년 3월 12일 오전에 주문된 내역만 조회하세요.
SELECT *
FROM orders
WHERE date = '2025-03-12' AND time <='12:00:00';


-- 10. `pizza_types` 테이블에서 이름에 'Cheese' 혹은 'Chicken'이 포함된 피자 종류를 조회하세요. (대소문자를 구분합니다)
SELECT *
FROM pizza_types
WHERE name
LIKE '%Cheese%' OR name LIKE '%Chicken%';
