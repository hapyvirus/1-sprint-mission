-- 1. `order_details` 테이블에서 각 피자(`pizza_id`)별로 주문된 건 수(`order_id`)를 보여주세요.
SELECT pizza_id ,COUNT(order_id)
FROM order_details
GROUP BY pizza_id;

-- 2. `order_details` 테이블에서 각 피자(`pizza_id`)별로 총 주문 수량을 구하세요.
SELECT pizza_id, SUM(quantity)
FROM order_details
GROUP BY pizza_id;

-- 3. `pizzas` 테이블에서 `price`의 크기가 20보다 큰 피자의 종류만 `order_details` 테이블에서 조회하세요. (힌트: 서브쿼리)
SELECT order_id, pizza_id, quantity
FROM order_details o
JOIN pizzas p ON o.pizza_id = p.id
WHERE o.pizza_id IN(
SELECT id
FROM pizzas
WHERE price > 20);

-- 4. `orders` 테이블에서 각 날짜별 총 주문 건수를 `order_count` 라는 이름으로 계산하고, 하루 총 주문 건수가 80건 이상인 날짜만 조회한 뒤, 주문 건수가 많은 순서대로 정렬하세요.
SELECT o.date, COUNT(o.id) AS order_count
FROM orders o
GROUP BY o.date
HAVING COUNT(o.id) >= 80
ORDER BY COUNT(o.id) DESC;

-- 5. `order_details` 테이블에서 피자별(`pizza_id`) 총 주문 수량이 10개 이상인 피자만 조회하고, 총 주문 수량 기준으로 내림차순 정렬하세요.
SELECT o.pizza_id, SUM(o.quantity) AS total_quantity
FROM order_details o
GROUP BY o.pizza_id
HAVING SUM(o.quantity) >= 10
ORDER BY SUM(o.quantity) DESC;

-- 6. `order_details` 테이블에서 피자별 총 수익을 `total_revenue` 라는 이름으로 구하세요. (수익 = `quantity * price`)
SELECT o.pizza_id, SUM(o.quantity * p.price) AS total_revenue
FROM order_details o
JOIN pizzas p ON p.id = o.pizza_id
GROUP BY o.pizza_id;


-- 7. 날짜별로 피자 주문 건수(`order_count`)와 총 주문 수량(`total_quantity`)을 구하세요.
SELECT o.date, COUNT(o.id) AS order_count, SUM(d.quantity) AS total_quantity
FROM orders o
JOIN order_details d ON d.order_id = o.id
GROUP BY o.date
ORDER BY o.date DESC;
