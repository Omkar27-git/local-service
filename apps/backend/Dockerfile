# 1. Base Image

FROM node:20-alpine

# 2. Set working directory 

WORKDIR /app

# 3. Copy package files 

COPY package.json ./

# 4. Install pnpm 

RUN npm install -g pnpm 

# 5. Install dependencies

RUN pnpm install 

# 6. copy source code 

COPY  . .

# 7. Build TypeScript
RUN pnpm build

# 8. Expose backend port
EXPOSE 4000

# 9. Start server
CMD ["pnpm", "start"]