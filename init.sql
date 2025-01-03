-- Create table `counter` if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'counter') THEN
        CREATE TABLE counter (
            id SERIAL PRIMARY KEY,
            name TEXT,
            current_value INTEGER NOT NULL
        );
    END IF;
END $$;

-- Create table `goals` if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'goals') THEN
        CREATE TABLE goals (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            value INTEGER NOT NULL
        );
    END IF;
END $$;

-- Create table `events` if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'events') THEN
        CREATE TABLE events (
            id SERIAL PRIMARY KEY,
            goal_id INTEGER REFERENCES goals(id) ON DELETE CASCADE,
            event_date TIMESTAMP NOT NULL,
            score INTEGER
        );
    END IF;
END $$;

-- Create table `counter_goals` if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'counter_goals') THEN
        CREATE TABLE counter_goals (
            id SERIAL PRIMARY KEY,
            counter_id INTEGER REFERENCES counter(id) ON DELETE CASCADE,
            goal_id INTEGER REFERENCES goals(id) ON DELETE CASCADE
        );
    END IF;
END $$;