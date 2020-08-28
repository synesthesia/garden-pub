# garden-pub

[![Netlify Status](https://api.netlify.com/api/v1/badges/a7e4d30a-01e5-46c3-8904-94ec5ca2e386/deploy-status)](https://app.netlify.com/sites/pedantic-spence-ad5f3a/deploys)

## Overview

This repository builds a GatsbyJS site to deploy a digital garden website based on [gatsby-theme-garden](https://github.com/mathieudutour/gatsby-digital-garden).

Content is sourced from the pages directory which is currently configured to pull in a [Foam](https://foambubble.github.io/foam/) repository of Markdown files.

To use this repository with a different source repository, clone this repository and delete the current submodule and replace with your own. NB because my source repository is private, unless you modify this repository will not build. 

## Build

The repository is designed to build on Netlify.

The build script updates the content repository by doing a `git pull origin master` - in other words you don't need to update this repository each time you update content.

Netlify needs full git read access to the content submodule to do this, so take the following steps:

1. using `ssh-keygen` create a new SSH public-private key pair without a passphrase.
2. Add the public key as a deploy key on the Github repo for the content submodule
3. In a text editor edit the private key to replace all newlines with underscore
4. In Netlify configure an environment variable called `SSH_KEY`. Paste the edited private key into this variable.
5. The build script checks if it is running on Netlify and if so re-transforms the private key and saves it to `~/.ssh/id_rsa`.

## Triggering Netlify to build on each content update

1. In Netlify [create a webhook](https://docs.netlify.com/site-deploys/notifications/#incoming-webhooks) for your site
2. Copy  the webhook URL
3. In Github go to the **repo for your content**
4. Add a secret called NETLIFY_HOOK_URL
5. Paste the webhook URL into the secret
6. In your **content repo** create a Github action:

`.github/workflows/deploy-netlify.yml`
```
name: Trigger Netlify build
on:
  push:
    branches:    
      - master
    
jobs:
  trigger-publish:
    runs-on: ubuntu-latest
    steps:
      - name: Invoke Netlify deployment hook
        uses: distributhor/workflow-webhook@v1
        env:
          webhook_url: ${{secrets.NETLIFY_HOOK_URL}}?trigger_title=content_update
          webhook_secret: "whatever"
```

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


## Copyright

This repository (c) Julian Elve 2020 onwards and released under the MIT licence  - see [[LICENSE]](LICENSE.md)