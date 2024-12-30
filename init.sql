-- Create table `counter` if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'counter') THEN
        CREATE TABLE counter (
            name TEXT PRIMARY KEY,
            value INTEGER NOT NULL
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

-- Create table `goal_events` if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'goal_events') THEN
        CREATE TABLE goal_events (
            id SERIAL PRIMARY KEY,
            goal_id INTEGER REFERENCES goals(id) ON DELETE CASCADE,
            event_date TIMESTAMP NOT NULL
        );
    END IF;
END $$;

-- Create table `counter_goals` if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'counter_goals') THEN
        CREATE TABLE counter_goals (
            counter_name TEXT REFERENCES counter(name) ON DELETE CASCADE,
            goal_id INTEGER REFERENCES goals(id) ON DELETE CASCADE,
            PRIMARY KEY (counter_name, goal_id)
        );
    END IF;
END $$;