SELECT us.country as country, AVG(tr.usd_amount) as avg_lifetime_spent
FROM users us
JOIN transactions tr ON us.id = tr.user_id
GROUP BY us.country
HAVING AVG(tr.usd_amount) < 500
ORDER BY avg_lifetime_spent DESC;
