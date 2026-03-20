---
title: Setting Up a VPS with Docker
description: A Step-by-Step Guide
giscus: true
---
Running apps in the cloud buys you reliability, reach, and easy scaling.  
In this guide, you’ll set up a Virtual Private Server (VPS) with Docker and a simple Swarm stack, using environment variables so you can reuse the same workflow across projects.

---

## Prerequisites

Before you start, define a few environment variables locally:

```bash
# Your server details
export SERVER_IP="your-server-ip"
export DOMAIN="your-domain.com"
export PROJECT_NAME="your-project-name"

# User/email you’ll use for deployment and notifications
export DEPLOY_USER="deploy"
export DEPLOY_EMAIL="${DEPLOY_USER}@${DOMAIN}"
```

---

## 🔑 Connect to the VPS

SSH into the freshly provisioned server:

```bash
ssh root@${SERVER_IP}
```

---

## 🔧 Install Docker

Once you’re in, install Docker and its dependencies:

```bash
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo \"${UBUNTU_CODENAME:-$VERSION_CODENAME}\") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io -y
```

At this point, `docker ps` should work on the server.

---

## 🌐 Configure DNS

Create an A record pointing your domain to `SERVER_IP`.  
After DNS propagates, you can SSH using the domain instead of the raw IP:

```bash
ssh root@${DOMAIN}
```

---

## 🐳 Create a Docker Context

To run Docker commands against the VPS from your local machine, create a remote Docker context:

```bash
docker context create ${PROJECT_NAME} --docker host=ssh://root@${DOMAIN}
docker context use ${PROJECT_NAME}
```

From now on, any `docker …` command you run will target the VPS through this context.

---

## 🚀 Initialize Docker Swarm

Turn the VPS into a single-node Swarm manager:

```bash
docker swarm init # Optionally: --advertise-addr ${SERVER_IP}
```

Docker will print a join command with a token. Keep it somewhere safe if you plan to add worker nodes later:

```bash
# Example output – your token will be different
docker swarm join --token SWMTKN-1-xxxxxxxxxxxxxxxxxxxx ${SERVER_IP}:2377
```

---

## 📦 Deploy the Application Stack

With Swarm running, deploy your stack using your `docker-compose.yml` (which Swarm treats as a stack file):

```bash
docker stack deploy -c docker-compose.yml ${PROJECT_NAME}
```

If your compose file defines a service bound to port 80, your app should now respond at:

```text
http://${DOMAIN}
```

To inspect logs from your main service:

```bash
docker service logs ${PROJECT_NAME}_app
```

(Adjust the service name if your compose file uses something different.)

---

## ✅ Wrap-up

You now have:

- A VPS reachable via your own domain
    
- Docker installed and accessible via a remote context
    
- A Swarm stack deployed from `docker-compose.yml`
    

From here you can iterate: add more services, attach extra nodes to the Swarm, configure HTTPS with a reverse proxy (Traefik, Caddy, or Nginx), and lock down the box with a non-root deploy user, firewall rules, and backups.