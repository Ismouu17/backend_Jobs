CREATE TABLE USERS (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL,
  role ENUM("recruteur", "demandeur") NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE EMPLOYEURS (
  employeur_id INT PRIMARY KEY AUTO_INCREMENT,
  employeur_name VARCHAR(100) NOT NULL,
  employeur_description TEXT,
  employeur_adresse VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE OFFRES(
  offre_id INT PRIMARY KEY AUTO_INCREMENT,
  employeur_id INT,
  offre_title VARCHAR(100) NOT NULL,
  offre_description TEXT NOT NULL,
  offre_location VARCHAR(100),
  offre_salary DECIMAL(10, 2),
  offre_deadline TIMESTAMP,
  offre_acceptCandidate INT NOT NULL,
  posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (employeur_id) REFERENCES EMPLOYEURS (employeur_id) ON DELETE CASCADE
);

CREATE TABLE COMPETENCES(
  competence_id INT PRIMARY KEY AUTO_INCREMENT,
  competence_name VARCHAR(100),
  competence_description TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE OFFRES_COMPETENCES(
  offre_fkid INT NULL,
  competence_fkid INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (offre_fkid) REFERENCES OFFRES (offre_id) ON DELETE CASCADE,
  FOREIGN KEY (competence_fkid) REFERENCES COMPETENCES (competence_id) ON DELETE CASCADE
);

CREATE TABLE CANDIDATURE (
  candidature_id INT PRIMARY KEY AUTO_INCREMENT,
  offre_id INT,
  user_id INT,
  status ENUM("appliquer", 
             "preselectionner", 
             "accepter", 
             "rejeter", 
             "supprimer", 
             "annuler", 
             "achever"),
  posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  joined_at TIMESTAMP,
  FOREIGN KEY (offre_id) REFERENCES OFFRES (offre_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES USERS (user_id) ON DELETE CASCADE
);

CREATE TABLE SKILLS (
  skill_id INT PRIMARY KEY AUTO_INCREMENT,
  skill_name VARCHAR(100) NOT NULL,
  institution_name VARCHAR(100) NOT NULL,
  start_year TIMESTAMP,
  end_year TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE USERS_SKILLS(
  skill_fkid INT NULL,
  user_fkid INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (skill_fkid) REFERENCES SKILLS (skill_id) ON DELETE CASCADE,
  FOREIGN KEY (user_fkid) REFERENCES USERS (user_id) ON DELETE CASCADE 
);

