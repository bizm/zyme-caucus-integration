#!/bin/bash

# if project_source directory exists we assume it as a fresh start for this container
if [ -d "/root/project_source" ]
then
  echo "Doing initial setup..."
  # move all the sources
  cp -r /root/project_source/* /root/workspace/
  rm -rf /root/project_source
  # not sure what's the point of settings-docker.xml but it comes in handy for us
  cp /root/.m2/settings-docker.xml /root/.m2/settings.xml
  # now instruct maven to store repository under our project directory, yep it is nasty but it'll help to speed up development a bit
  sed -i 's#<localRepository>.*</localRepository>#<localRepository>/root/workspace/.m2</localRepository>#' /root/.m2/settings.xml

  echo "Fetching certificate from mocks..."
  echo -n true | openssl s_client -connect host.docker.internal:443 2>/dev/null | openssl x509 > ~/docker.crt
  keytool -importcert -file ~/docker.crt -alias docker -keystore  $(echo $JAVA_HOME)/lib/security/cacerts -storepass changeit -noprompt

  echo "We're ready to go now!"
fi

mvn clean compile vertx:run -P dev-docker