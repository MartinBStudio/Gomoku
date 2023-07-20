FROM openjdk:17
ENV ARTIFACT_NAME=001.jar
ENV GOMOKU_DB_PW=TestingPassword012023
ENV GOMOKU_DB_USER=Gomoku
ENV GOMOKU_MAIN_USER_TOKEN=6e64bceb-dd49-4a7e-a431-7c8f681bea64
ENV BSTUDIO_DB_URL=jdbc:oracle:thin:@192.168.1.4:1522:xe
COPY /*.jar ./$ARTIFACT_NAME
LABEL maintainer="Martin Masika <martin.masika@icloud.com>"
CMD ["java","-jar","001.jar"]