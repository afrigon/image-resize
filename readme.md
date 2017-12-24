![](http://res.cloudinary.com/frigstudio/image/upload/v1514115143/image-resize-banner_guzwlg.jpg)

![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)
[![Dependency Status](https://david-dm.org/afrigon/image-resize/status.svg)](https://david-dm.org/afrigon/image-resize)

This command line interface enables you to resize squared images to desired size super quickly.

## Use Cases

* Create multiple size of a logo
* Resizing image for website optimization
* Resizing a bunch of images at once

## Examples

In this example my source is a directory located at `~/project/logos` and my destination is a directory located at `~/project/output`. All the images contained in the logo directory will have new copies resized at `128x128`, `256x256` and `512x512`.

```sh
./image-resize -s 128 -s 256 -s 512 ~/project/logos ~/project/output
```

## Installation

### Manual

You'll need to have [node and npm](https://nodejs.org/en/download/) installed. Start off by cloning the project to your machine.

```sh
git clone https://github.com/afrigon/image-resize.git
```

Install the dependencies with npm and give execution right to the program.

```sh
cd image-resize
npm i
chmod 0755 image-resize
```

And you're done, you can now run the program with the help flag to see the usage manual.

```sh
./image-resize -h
```

If you plan on using Image-resize frequently you can make it available from anywhere on your system by moving it

```sh
sudo mv image-resize /usr/bin/image-resize
```

then you'll be able to do this from anywhere

```sh
image-resize -v
```

## Documentation

### Usage

```
$ usage: image-resize [-h] [-v] [-s SIZE] INPUT OUTPUT

Simple utility to quickly resize squared images

Positional arguments:
  INPUT                 Input file or directory
  OUTPUT                Output directory

Optional arguments:
  -h, --help            Show this help message and exit.
  -v, --version         Show program's version number and exit.
  -s SIZE, --size SIZE  Size of the output, can be specified multiple times
```

## Contributing

Feel free to create pull requests I would be happy to see this little tool evolve.

### License

Image-resize is [MIT licensed](./LICENSE).
