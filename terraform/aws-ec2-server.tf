provider "aws" {
  access_key = "ACCESS_KEY_HERE"
  secret_key = "SECRET_KEY_HERE"
  region     = "eu-north-1"
}

resource "aws_instance" "example" {
  ami           = "ami-2757f631"
  instance_type = "t3.micro"
}