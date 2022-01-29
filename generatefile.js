const path = require("path");
const fs = require("fs");
const directorycode = path.join(__dirname, "codes");
const { v4: uuid } = require("uuid");
if (!fs.existsSync(directorycode)) {
  fs.mkdirSync(directorycode, { recursive: true });
}
const generatefile = async (format, content) => {
  const jobid = uuid();
  const filename = `${jobid}.${format}`;
  const filepath = path.join(directorycode, filename);
  await fs.writeFileSync(filepath, content);
  return filepath;
};

module.exports = {
  generatefile,
};
