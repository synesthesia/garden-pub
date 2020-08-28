# garden-pub

## Overview

This repository builds a GatsbyJS site to deploy a digital garden website based on [gatsby-theme-garden](https://github.com/mathieudutour/gatsby-digital-garden).

Content is sourced from the pages directory which is currently configured to pull in a [Foam](https://foambubble.github.io/foam/) repository of Markdown files.

To use this repository with a different source repository delete the current submodule and replace with your own.

## Build

The repository is designed to build on Netlify.

To give Netlify full git read access to the content submodule take the following steps:

1. using `ssh-keygen` create a new SSH public-private key pair without a passphrase.
2. Add the public key as a deploy key on the Github repo for the content submodule
3. In a text editor edit the private key to replace all newlines with underscore
4. In Netlify configure an environment variable called `SSH_KEY`. Paste the edited private key into this variable.
5. The build script checks if it is running on Netlify and if so re-transforms the private key and saves it to `~/.ssh/id_rsa`.


## Local development

If your workstation is Mac or Linux you can directly run `yarn install && gatsby develop` in the root of this repository.

GatsbyJS develop mode seems to be flakey on Windows hosts.

To get around that this repo contains a Vagrantfile to define a simple linux VM for use in development.

Following assumes that VirtualBox and Vagrant are installed and working.

The Vagrantfile forwards port 8000 on the guest VM to port 8000 on the host, so you can still monitor changes by pointing a browser at 

* http://garden.test:8000 or 
* http://localhost:8000


On host:

```
$> vagrant up
$> vagrant ssh
```

On guest VM
```

vagrant@gatsby:~$ cd site
vagrant@gatsby:~/site$ yarn install
vagrant@gatsby:~/site$ gatsby develop -H 0.0.0.0

```


