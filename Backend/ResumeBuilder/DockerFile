# compile the application
FROM maven:3.8.6-openjdk-18 AS build
COPY . .
RUN mvn clean package -DskipTests

# run the application
FROM openjdk:18-ea-8-jdk-slim 
COPY --from=build /target/resumebuilder-0.0.1-SNAPSHOT.jar resumebuilder.jar
EXPOSE 8080
ENTRYPOINT [ "java","-jar","resumebuilder.jar"]
