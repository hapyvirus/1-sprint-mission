/*
--1. 피자별(`pizzas.id` 기준) 판매 수량 순위에서 피자별 판매 수량 상위에 드는 베스트 피자를 10개를 조회해 주세요. 
    `pizzas`의 모든 컬럼을 조회하면서 각 피자에 해당하는 판매량을 `total_quantity`라는 이름으로 함께 조회합니다.
        
        출력 예시:

        ```sql
            big_meat_s    | big_meat    | S    |    12 |           1914
            thai_ckn_l    | thai_ckn    | L    | 20.75 |           1410
            five_cheese_l | five_cheese | L    |  18.5 |           1409
            four_cheese_l | four_cheese | L    | 17.95 |           1316
            classic_dlx_m | classic_dlx | M    |    16 |           1181
            spicy_ital_l  | spicy_ital  | L    | 20.75 |           1109
            hawaiian_s    | hawaiian    | S    |  10.5 |           1020
            southw_ckn_l  | southw_ckn  | L    | 20.75 |           1016
            bbq_ckn_l     | bbq_ckn     | L    | 20.75 |            992
            bbq_ckn_m     | bbq_ckn     | M    | 16.75 |            956
        ```
*/
SELECT p.*, SUM(o.quantity) AS total_quantity
FROM pizzas p
JOIN order_details o ON o.pizza_id = p.id 
GROUP BY p.id
ORDER BY SUM(o.quantity) DESC
LIMIT 10;


/*
    2. `orders` 테이블에서 2025년 3월의 일별 주문 수량을 `total_orders`라는 이름으로, 일별 총 주문 금액을 `total_amount`라는 이름으로 포함해서 조회하세요.
        
        출력 예시:
        
        ```sql
        2025-03-01 |           99 | 1598.5500011444092
        2025-03-02 |          138 |  2379.050001144409
        2025-03-03 |          133 | 2287.8999996185303
        2025-03-04 |          144 |  2444.300001144409
        2025-03-05 |          140 |  2350.650005340576
        ```
*/
SELECT o.date, COUNT(o.id) AS total_orders, SUM(d.quantity*p.price) AS total_amount
FROM order_details d
JOIN orders o ON d.order_id = o.id
JOIN pizzas p ON d.pizza_id = p.id
WHERE date >= '2025-03-01' AND date <'2025-04-01'
GROUP BY o.date 
ORDER BY o.date ASC;    

/*
    3. `order`의 `id`가 78에 해당하는 주문 내역들을 조회합니다. 주문 내역에서 각각 주문한 피자의 이름을 `pizza_name`, 
        피자의 크기를 `pizza_size`, 피자 가격을 `pizza_price`, 수량을 `quantity`, 각 주문 내역의 총 금액을 `total_amount` 라는 이름으로 조회해 주세요.
        
        출력 예시:
        
        ```sql
        The Thai Chicken Pizza      | S          |       12.75 |        1 |              12.75
        The Big Meat Pizza          | S          |          12 |        1 |                 12
        The Classic Deluxe Pizza    | S          |          12 |        1 |                 12
        The Italian Capocollo Pizza | M          |          16 |        1 |                 16
        The Spicy Italian Pizza     | L          |       20.75 |        3 |              62.25
        The Four Cheese Pizza       | L          |       17.95 |        1 | 17.950000762939453
        ```
*/
SELECT pt.name AS pizza_name, p.size AS pizza_size, p.price AS pizza_price, d.quantity AS quantity, (d.quantity*p.price) AS total_amount
FROM order_details d
JOIN pizzas p ON d.pizza_id = p.id
JOIN pizza_types pt ON p.type_id = pt.id
WHERE d.order_id = 78;


/*    
    4. `order_details`와 `pizzas` 테이블을 JOIN해서 피자 크기별(S, M, L) 총 수익을 계산하고, 크기별 수익을 출력하세요.
        
        출력 예시:
        
        ```sql
        L    |  375318.7010040283
        M    |          249382.25
        S    | 178076.49981307983
        XL   |              14076
        XXL  | 1006.6000213623047
        ```
*/

SELECT p.size AS pizza_size, SUM(d.quantity*p.price) AS total_revenue
FROM order_details d
JOIN pizzas p ON p.id = d.pizza_id
GROUP BY p.size
ORDER BY SUM(d.quantity*p.price) DESC; 

/*    
    5. `order_details`, `pizzas`, `pizza_types` 테이블을 JOIN해서 각 피자 종류의 총 수익을 계산하고, 수익이 높은 순서대로 출력하세요.
        
        출력 예시:
        
        ```sql
        The Thai Chicken Pizza                     |           43434.25
        The Barbecue Chicken Pizza                 |              42768
        The California Chicken Pizza               |            41409.5
        The Classic Deluxe Pizza                   |            38180.5
        The Spicy Italian Pizza                    |           34831.25
        The Southwest Chicken Pizza                |           34705.75
        The Italian Supreme Pizza                  |           33476.75
        ```
*/

SELECT pt.name AS pizza_name, SUM(d.quantity*p.price) AS total_revenue
FROM order_details d
JOIN pizzas p ON p.id = d.pizza_id
JOIN pizza_types pt ON pt.id = p.type_id
GROUP BY pt.name
ORDER BY SUM(d.quantity*p.price) DESC;
