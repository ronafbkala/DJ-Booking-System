# --- Build phase ---
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Kopiera pom och dra dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Kopiera källkod och bygg
COPY src ./src
RUN mvn clean package -DskipTests

# --- Runtime phase ---
FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
