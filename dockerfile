# GENERAL ENV
ENV ARTIFACT_NAME=gomoku.jar
ENV DATABASE_PASSWORD=VALUE_NOT_SET
ENV DATABASE_USERNAME=VALUE_NOT_SET
ENV DATABASE_CS=VALUE_NOT_SET
ENV SERVER_PORT=5000
# Copy the jar file from the build/libs directory
COPY build/libs/$ARTIFACT_NAME /$ARTIFACT_NAME
# Set the maintainer label
LABEL maintainer="Martin Masika <martin.masika@icloud.com>"
# Run the jar file using the ARTIFACT_NAME variable
CMD ["sh", "-c", "java -jar /$ARTIFACT_NAME"]
