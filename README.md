# Demon Slayer Web App

This is a Demon Slayer web application that allows users to search for and view information about various characters from the Demon Slayer anime series. The application retrieves character data from a public API and displays it dynamically on the web page.

![Demon Slayer](Pictures/logo.png)

## Features

- Display detailed information about each character
- View profile images of each character
- Responsive design with Bootstrap 5
- Smooth animations with AOS library
- Character combat styles information
- Series information and details

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Bootstrap 5.3
- AOS (Animate On Scroll)
- Font Awesome Icons
- Nginx (for containerized deployment)

## API Used

- [Demon Slayer API](https://demon-slayer-api.onrender.com/v1/)

## Project Structure

```
Demon-Slayer/
├── index.html              # Main HTML file
├── Js/
│   ├── script.js           # Main JavaScript file
│   ├── combat.js           # Combat styles functionality
│   └── series.js           # Series information
├── Styles/
│   ├── index.css           # Main styles
│   ├── navbar.css          # Navigation styles
│   ├── home.css            # Home section styles
│   ├── about.css           # About section styles
│   ├── character.css       # Character section styles
│   ├── combatstyle.css     # Combat styles section
│   ├── series.css          # Series section styles
│   └── footer.css          # Footer styles
├── Pictures/               # Image assets
├── Dockerfile              # Docker configuration
├── docker-compose.yml      # Docker Compose configuration
├── nginx.conf              # Nginx server configuration
├── CI.JenkinsFile          # Jenkins CI/CD pipeline
└── sonar-project.properties # SonarQube configuration
```

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Docker (optional, for containerized deployment)

### Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/SithumRaigamage/Demon-Slayer.git
   cd Demon-Slayer
   ```

2. Open `index.html` in your web browser.

### Running with Docker

1. Build and run using Docker Compose:
   ```bash
   docker-compose up -d
   ```

2. Access the application at `http://localhost:3000`

3. To stop the container:
   ```bash
   docker-compose down
   ```

### Running with Docker (without Compose)

1. Build the Docker image:
   ```bash
   docker build -t demon-slayer-website .
   ```

2. Run the container:
   ```bash
   docker run -d -p 3000:80 demon-slayer-website
   ```

3. Access the application at `http://localhost:3000`

## CI/CD Pipeline

This project includes a Jenkins pipeline (`CI.JenkinsFile`) that automates:

- **Checkout**: Clones the repository from GitHub
- **Version Verification**: Validates semantic versioning format
- **SonarQube Analysis**: Performs static code analysis
- **Docker Build**: Builds the Docker image
- **Trivy Security Scan**: Scans for container vulnerabilities
- **Email Notifications**: Sends build status notifications

## Code Quality

SonarQube is configured for static code analysis. Run analysis locally:

```bash
./run-sonar.sh
```

## License

This project is for educational and fan purposes only. Demon Slayer is property of Koyoharu Gotouge.

## Author

- **Sithum Raigamage** - [GitHub](https://github.com/SithumRaigamage)

