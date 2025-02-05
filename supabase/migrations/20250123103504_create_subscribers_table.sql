-- Creation of the Subscribers table
CREATE TABLE IF NOT EXISTS Subscribers (
    id SERIAL PRIMARY KEY, -- Unique id, auto-incremented
    user_email VARCHAR(255) NOT NULL, -- Email of the user (remove UNIQUE if duplicate entries are allowed)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Date of subscription (defaults to current timestamp)
    next_newsletter TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Next newsletter send date (defaults to now)
    periodicity INTEGER DEFAULT 604800 -- Interval between newsletters in seconds (default: 604800 seconds = 7 days)
);
