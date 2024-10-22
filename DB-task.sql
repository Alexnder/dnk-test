WITH RECURSIVE parent_tree AS (
    SELECT id, parent_id
    FROM pages
    WHERE id = 302
    UNION ALL
    SELECT p.id, p.parent_id
    FROM pages p
    INNER JOIN parent_tree pt ON pt.parent_id = p.id
)
SELECT id FROM parent_tree WHERE id != 302;