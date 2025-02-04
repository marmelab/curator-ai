-- Drop the table if it already exists
DROP TABLE IF EXISTS Subscribers;

-- Create the Subscribers table
CREATE TABLE Subscribers (
    id SERIAL PRIMARY KEY, -- Unique ID, auto-incremented
    user_email VARCHAR(255) UNIQUE NOT NULL, -- Unique email of the user, mandatory
    themes TEXT[] DEFAULT '{}', -- List of strings, default is an empty array
    unwanted_themes TEXT[] DEFAULT '{}', -- List of strings, default is an empty array
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Date of subscription, default: now
);