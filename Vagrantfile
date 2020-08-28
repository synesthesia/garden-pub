# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|
  # The most common configuration options are documented and commented below.
  # For a complete reference, please see the online documentation at
  # https://docs.vagrantup.com.

  # Every Vagrant development environment requires a box. You can search for
  # boxes at https://vagrantcloud.com/search.
  config.vm.box = "bento/ubuntu-18.04"
   
  # Set memory for the default VM
  config.vm.provider "virtualbox" do |vb|
    vb.memory = "2048"
  end

  # forward port 8000 which is used by gatsby
  config.vm.network "forwarded_port", guest: 8000, host: 8000

  
  # Configure vbguest auto update options
  config.vbguest.auto_update = false
  config.vbguest.no_install = false
  config.vbguest.no_remote = true
  
  # Configure the hostname for the default machine
  config.vm.hostname = "gatsby"

  config.vm.network :private_network, ip: "192.168.50.10"
  config.hostsupdater.aliases = ["garden.test"]

  config.vm.synced_folder ".", "/home/vagrant/site"
  
  # provision node and gatsby
  config.vm.provision "shell", path: "provision.sh"

end
