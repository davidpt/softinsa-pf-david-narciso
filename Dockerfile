FROM openjdk:17 as mysqldoc
EXPOSE 8080
WORKDIR /app

# Copy maven executable to the image
COPY mvnw .
COPY .mvn .mvn

# Copy the pom.xml file
COPY pom.xml .

# Copy the project source
COPY ./src ./src

# Copy the project build
COPY ./target ./target

RUN chmod 755 /app/mvnw
#RUN ./mvnw dependency:go-offline -B
#RUN ./mvnw package -DskipTests

ENTRYPOINT ["java","-jar","target/david-narciso-0.0.1-SNAPSHOT.jar"]