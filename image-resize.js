#!/usr/bin/env node
"use strict";

const startTime = new Date().getTime();
const extFilters = ["jpeg", "jpg", "png", "webp", "tiff", "gif", "svg"];

// lib
const sharp = require("sharp");
const ArgumentParser = require("argparse").ArgumentParser;
const fs = require("fs-extra");
const path = require("path");

// argument parsing
const parser = new ArgumentParser({
    version: "1.0.0",
    addHelp: true,
    prog: "image-resize",
    description: "Simple utility to quickly resize squared images"
});
parser.addArgument(["-s", "--size"], {
    help: "Size of the output, can be specified multiple times",
    action: "append",
    type: "int",
    metavar: "SIZE",
    dest: "sizes"
});
parser.addArgument("input", {
    help: "Input file or directory",
    metavar: "INPUT"
});
parser.addArgument("output", {
    help: "Output directory",
    metavar: "OUTPUT"
});
const args = parser.parseArgs();

async function isDirectory(filePath, callback) {
    try {
        const stats = await fs.lstat(filePath);
        return stats.isDirectory();
    } catch (err) { throw new Error("path does not exists"); }
}

async function getInputFiles(filePath) {
    try {
        const isDir = await isDirectory(filePath);
        if (isDir) {
            var files = await fs.readdir(filePath);
            files = files.filter((n) => {
                return extFilters.indexOf(path.extname(n).toLowerCase().slice(1)) != -1
            });
        } else {
            var files = [path.basename(filePath)];
        }
        
        return {
            files: files,
            directory: isDir ? filePath : path.dirname(filePath)
        }
    } catch (err) { throw new Error(`INPUT ${err.message}`); }
}

async function getOutputDirectory(filePath) {
    try {
        const isDir = await isDirectory(filePath);
        if (!isDir) { throw new Error("OUTPUT should be a directory"); }
        return filePath;
    } catch (err) { throw new Error(`OUTPUT ${err.message}`); }
}

async function resize(filename, inputDirectory, outputDirectory, size) {
    try {
        return await sharp(path.join(inputDirectory, filename)).resize(size).toFile(path.join(outputDirectory, `${filename}-${size}`));
    } catch (err) {
        return minorError(new Error(`${err.message} for image named: ${filename} of size: ${size}`));
    }
}

async function resizeAll(files, input, output, sizes) {
    for (let file of files) {
        for (let size of sizes) {
            try {
                await resize(file, input, output, size);
            } catch (err) { throw new Error(`could not resize image of size ${size}`); }
        }
    }
}

function minorError(err) {
    return console.log(`image-resize: error: ${err instanceof Error ? err.message : "an unknown error occured"}`);
}

function fatalError(err) {
    return console.log(`image-resize: error: ${err instanceof Error ? err.message : "an unknown error occured"}`) & process.exit();
}

// module.resize = (input, output, sizes, callback) => {
//     (async () => {
//         try {
//             if (args.sizes) {
//                 const inputInfo = await getInputFiles(path.resolve(input));
//                 const outputDirectory = await getOutputDirectory(path.resolve(output));
//                 await resizeAll(inputInfo.files, inputInfo.directory, outputDirectory, sizes);
//             }
//             return callback();
//         } catch (err) {
//             return callback(err);
//         }
//     })();
// };
(async () => {
    try {
        if (args.sizes) {
            const inputInfo = await getInputFiles(path.resolve(args.input));
            const outputDirectory = await getOutputDirectory(path.resolve(args.output));
            await resizeAll(inputInfo.files, inputInfo.directory, outputDirectory, args.sizes);
        }
        console.log(`image-resize: done in ${new Date().getTime() - startTime}ms`);
    } catch (err) { fatalError(err); }
})();