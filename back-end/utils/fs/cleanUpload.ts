import exress from "express";
import fs from "fs";
import path from "path";

const removefiles = async () => {
  const files = await fs.promises.readdir("upload");
  files.forEach(async (file) => {
    fs.promises.unlink(path.join("upload", file));
  });
};

export default removefiles;

