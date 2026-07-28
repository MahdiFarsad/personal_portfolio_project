CREATE TABLE IF NOT EXISTS projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  category VARCHAR(100),
  short_desc TEXT,
  full_desc TEXT,
  tech_stack VARCHAR(500),
  github_url VARCHAR(500),
  demo_url VARCHAR(500),
  thumbnail VARCHAR(500),
  status ENUM('published', 'upcoming') DEFAULT 'published',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS experience (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  start_date VARCHAR(50),
  end_date VARCHAR(50),
  description TEXT,
  sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS education (
  id INT AUTO_INCREMENT PRIMARY KEY,
  degree VARCHAR(255) NOT NULL,
  institution VARCHAR(255),
  start_date VARCHAR(50),
  end_date VARCHAR(50),
  description TEXT
);

CREATE TABLE IF NOT EXISTS research (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  link VARCHAR(500),
  date VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt TEXT,
  content LONGTEXT,
  cover_image VARCHAR(500),
  published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS media (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT NULL,
  file_path VARCHAR(500) NOT NULL,
  type ENUM('image', 'video') DEFAULT 'image',
  caption VARCHAR(255),
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS submissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  form_type VARCHAR(50) DEFAULT 'contact',
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  project_id INT NULL,
  ip_address VARCHAR(64),
  status ENUM('new', 'read') DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL
);
