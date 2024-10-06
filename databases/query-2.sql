SELECT us.id as user_id, SUM(tr.usd_amount) AS total_spent
FROM users us
JOIN transactions tr ON us.id = tr.user_id
GROUP BY us.id
HAVING SUM(tr.usd_amount) >100 AND SUM(tr.usd_amount) < 2000;
