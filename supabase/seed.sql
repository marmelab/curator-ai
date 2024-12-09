-- Création de la table Subscribers
CREATE TABLE IF NOT EXISTS Subscribers (
    id SERIAL PRIMARY KEY, -- Identifiant unique, auto-incrémenté
    user_email VARCHAR(255) UNIQUE NOT NULL, -- Adresse email unique et obligatoire
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Date d'inscription, valeur par défaut : date/heure actuelle
);
