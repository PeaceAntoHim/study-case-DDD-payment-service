FROM oven/bun:latest
# Set working directory
WORKDIR /app

# Copy package.json and bun.lockb for dependency installation
COPY package.json .
COPY bun.lockb .

# Copy other necessary files
COPY tsconfig.json .
COPY prisma prisma
COPY src src

# Install dependencies using bun
RUN bun install --frozen-lockfile --production

# Set NODE_ENV to production
ENV NODE_ENV production

# Generate Prisma client
RUN bunx prisma generate

# Expose port
EXPOSE 3000

# Define the command to run your application
CMD ["bun", "src/index.ts"]
