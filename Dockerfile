FROM maven:3-jdk-11

ENV ZYME_API_ENDPOINT_DNS=https://host.docker.internal
ENV ZYME_API_HOST=127.0.0.1
ENV SECRET_CAUCUS_JWT_KEY=123456abcdefghijklmnopqrstuvwxyz
ENV SECRET_ZYME_JWT_KEY=abcdefghijklmnopqrstuvwxyz123456

# manually run entrypoint from parent image since it will be overriden by this Dockerfile
RUN ./usr/local/bin/mvn-entrypoint.sh; \
    cp /root/.m2/settings-docker.xml /root/.m2/settings.xml; \
    sed -i 's#<localRepository>.*</localRepository>#<localRepository>/root/workspace/.m2</localRepository>#' /root/.m2/settings.xml

EXPOSE 8080/tcp
EXPOSE 9000/tcp

WORKDIR /root/workspace
ENTRYPOINT ["bash"]
