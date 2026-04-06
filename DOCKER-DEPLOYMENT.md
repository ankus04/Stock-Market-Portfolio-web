# Docker Deployment Guide for EC2

## Prerequisites
- AWS EC2 instance (Ubuntu recommended)
- Docker and Docker Compose installed on EC2

## Steps to Deploy

1. **Install Docker and Docker Compose on EC2:**
   ```bash
   sudo apt update
   sudo apt install docker.io docker-compose
   sudo systemctl start docker
   sudo systemctl enable docker
   ```

2. **Clone or upload your project to EC2:**
   ```bash
   git clone <your-repo-url>
   cd Stock-Market-Portfolio
   ```

3. **Set environment variables:**
   Edit the `.env` file with your actual JWT_SECRET and any other secrets.

4. **Build and run the application:**
   ```bash
   docker-compose up --build -d
   ```

5. **Access the application:**
   - Frontend: http://your-ec2-public-ip
   - Backend: http://your-ec2-public-ip:5000 (if needed)

## Notes
- MongoDB data is persisted in a Docker volume.
- Ensure security groups allow traffic on ports 80 and 22.
- For production, consider using a reverse proxy like Nginx outside Docker for SSL.