FROM maven:3-jdk-11


ADD src /root/project_source/src
ADD pom.xml /root/project_source/

# manually run entrypoint from parent image since it will be overriden by this Dockerfile
RUN ./usr/local/bin/mvn-entrypoint.sh

EXPOSE 8080/tcp
EXPOSE 9000/tcp

# Don't forget that docker-compose builds this image from project root directory
COPY dev/entrypoint.sh /bin

WORKDIR /root/workspace
VOLUME /root/workspace
ENTRYPOINT [ "entrypoint.sh" ]
