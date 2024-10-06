SELECT us.id AS user_id, us.email, SUM(tr.usd_amount) AS total_spent
FROM users us
JOIN transactions tr ON us.id = tr.user_id
GROUP BY us.id, us.email
ORDER BY total_spent DESC
LIMIT 3;
