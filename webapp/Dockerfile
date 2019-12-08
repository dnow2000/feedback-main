FROM python:3.7

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update \
    && apt-get install -y \
       apt-transport-https \
       fonts-liberation \
       libappindicator3-1 \
       libasound2 \
       libnss3 \
       libxss1 \
       lsb-release \
       xdg-utils \
       yarn \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
COPY ./.nvmrc /lib/node/.nvmrc
RUN NODE_VERSION=$(cat /lib/node/.nvmrc | cut -d"v" -f2) && \
    bash -c "source ~/.profile && nvm install $NODE_VERSION && nvm use $NODE_VERSION"

RUN wget https://dl.google.com/linux/chrome/deb/pool/main/g/google-chrome-stable/google-chrome-stable_74.0.3729.169-1_amd64.deb
RUN dpkg -i google-chrome-stable_74.0.3729.169-1_amd64.deb

COPY ./package.json /lib/node/package.json
RUN bash -c "source ~/.profile && cd /lib/node && yarn install"

EXPOSE 3000
