-- Create table `Goals` if it doesn't exist

-- Create table `Categories` if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'categories') THEN
        CREATE TABLE categories (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL
            );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'goals') THEN
        CREATE TABLE goals (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            base_points INTEGER NOT NULL,
            category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL
        );
    END IF;
END $$;



-- Create table `Events` if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'events') THEN
        CREATE TABLE events (
            id SERIAL PRIMARY KEY,
            event_date TIMESTAMP NOT NULL,
            goal_id INTEGER REFERENCES goals(id) ON DELETE CASCADE,
            created_dt TIMESTAMP DEFAULT NOW() NOT NULL,
            points INTEGER NOT NULL
        );
    END IF;
END $$;


-- Insert dummy data into the `categories` table with predefined IDs
INSERT INTO categories (id, name)
VALUES
    (1, 'Fitness'),
    (2, 'Household'),
    (3, 'Cats'),
    (4, 'Health'),
    (5, 'Unhealthy')
ON CONFLICT DO NOTHING;

-- Reset the sequence to ensure it starts from the next available ID
SELECT setval(pg_get_serial_sequence('categories', 'id'), MAX(id)) FROM categories;

-- Insert dummy data into the `goals` table
INSERT INTO goals (name, base_points, category_id)
VALUES
    ('treadmill - 5 min', 1, 1),
    ('treadmill - 1u', 12, 1),
    ('treadmill - 2u', 30, 1),
    ('threadmill - 3u', 60, 1),
    ('Dishwasher', 1, 2),
    ('washing machine', 1, 2),
    ('dryer', 1, 2),
    ('1 litterbox', 2, 3),
    ('2 litterboxes', 6, 3),
    ('fresh water', 1, 3),
    ('OMAD', 1, 4),
    ('Cook a meal', 5, 4),
    ('Pizzahut', -100, 5),
    ('Alcohol', -25, 5),
    ('Delivery', -50, 5),
    ('Candy / Chips', -25, 5)
ON CONFLICT DO NOTHING;