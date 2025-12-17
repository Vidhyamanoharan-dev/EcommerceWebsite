# Use official OpenJDK 23 image
FROM openjdk:23-jdk-slim

# Set working directory
WORKDIR /app

# Copy pom.xml and mvnw
COPY mvnw pom.xml ./
COPY .mvn .mvn

# Copy source code
COPY src src

# Make mvnw executable
RUN chmod +x mvnw

# Build the project
RUN ./mvnw clean package -DskipTests

# Expose port 8080
EXPOSE 8080

# Run the jar
CMD ["java", "-jar", "target/*.jar"]
