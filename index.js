const fs = require("fs/promises");
const convert = require("heic-convert");
const Transformer = require("@napi-rs/image");

(async () => {
  try {
    const files = await fs.readdir(__dirname + "/files");

    for (file in files) {
      const inputBuffer = await fs.readFile(
        __dirname + "/files/" + files[file]
      );
      const outputBuffer = await convert({
        buffer: inputBuffer, // the HEIC file buffer
        format: "JPEG", // output format
        quality: 1, // the jpeg compression quality, between 0 and 1
      });
      const tFile = await new Transformer.Transformer(outputBuffer)
        .resize(1024 / 2)
        .png();

      await fs.writeFile(
        `./converted_files/${files[file].split(".")[0]}.jpg`,
        tFile
      );
      console.timeEnd(`${files[file]} converted to png`);
    }
  } catch (error) {
    console.log(error);
  }
})();
