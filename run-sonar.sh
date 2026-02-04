#!/bin/bash

# ============================================
# SonarQube Scanner Script for Demon Slayer
# ============================================

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
SONAR_HOST="http://localhost:9000"
PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo -e "${BLUE}============================================${NC}"
echo -e "${BLUE}   Demon Slayer - SonarQube Scanner${NC}"
echo -e "${BLUE}============================================${NC}"
echo ""

# Check if SonarQube server is running
echo -e "${YELLOW}[1/4] Checking SonarQube server...${NC}"
SONAR_STATUS=$(curl -s "$SONAR_HOST/api/system/status" 2>/dev/null | grep -o '"status":"[^"]*"' | cut -d'"' -f4)
if [ "$SONAR_STATUS" = "UP" ]; then
    echo -e "${GREEN}✓ SonarQube server is running at $SONAR_HOST${NC}"
else
    echo -e "${RED}✗ SonarQube server is not reachable at $SONAR_HOST${NC}"
    echo -e "${YELLOW}Make sure Docker is running and SonarQube container is started.${NC}"
    echo ""
    echo "To start SonarQube with Docker:"
    echo "  docker-compose up -d"
    echo ""
    exit 1
fi

# Check if sonar-scanner is installed
echo -e "${YELLOW}[2/4] Checking sonar-scanner installation...${NC}"
if command -v sonar-scanner &> /dev/null; then
    SCANNER_VERSION=$(sonar-scanner --version 2>&1 | head -1)
    echo -e "${GREEN}✓ $SCANNER_VERSION${NC}"
else
    echo -e "${RED}✗ sonar-scanner is not installed${NC}"
    echo ""
    echo "Install sonar-scanner using one of these methods:"
    echo ""
    echo "  macOS (Homebrew):"
    echo "    brew install sonar-scanner"
    echo ""
    echo "  Or download from:"
    echo "    https://docs.sonarqube.org/latest/analyzing-source-code/scanners/sonarscanner/"
    echo ""
    exit 1
fi

# Check for authentication token
echo -e "${YELLOW}[3/4] Checking authentication...${NC}"
if [ -n "$SONAR_TOKEN" ]; then
    echo -e "${GREEN}✓ Using SONAR_TOKEN from environment${NC}"
    TOKEN_ARG="-Dsonar.token=$SONAR_TOKEN"
elif grep -q "^sonar.token=" "$PROJECT_DIR/sonar-project.properties" 2>/dev/null; then
    echo -e "${GREEN}✓ Using token from sonar-project.properties${NC}"
    TOKEN_ARG=""
else
    echo -e "${YELLOW}⚠ No authentication token found${NC}"
    echo ""
    echo "To generate a token:"
    echo "  1. Go to $SONAR_HOST"
    echo "  2. Log in (default: admin/admin)"
    echo "  3. Go to: My Account > Security > Generate Token"
    echo "  4. Either:"
    echo "     - Export it: export SONAR_TOKEN=your-token"
    echo "     - Or add to sonar-project.properties: sonar.token=your-token"
    echo ""
    read -p "Do you want to continue without authentication? (y/n): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
    TOKEN_ARG=""
fi

# Run the scanner
echo -e "${YELLOW}[4/4] Running SonarQube analysis...${NC}"
echo ""

cd "$PROJECT_DIR"

sonar-scanner \
    -Dsonar.host.url=$SONAR_HOST \
    $TOKEN_ARG \
    -Dsonar.projectBaseDir="$PROJECT_DIR"

SCAN_RESULT=$?

echo ""
if [ $SCAN_RESULT -eq 0 ]; then
    echo -e "${GREEN}============================================${NC}"
    echo -e "${GREEN}   ✓ Analysis completed successfully!${NC}"
    echo -e "${GREEN}============================================${NC}"
    echo ""
    echo -e "View results at: ${BLUE}$SONAR_HOST/dashboard?id=demon-slayer${NC}"
    echo ""
else
    echo -e "${RED}============================================${NC}"
    echo -e "${RED}   ✗ Analysis failed${NC}"
    echo -e "${RED}============================================${NC}"
    echo ""
    echo "Check the logs above for error details."
    exit 1
fi
