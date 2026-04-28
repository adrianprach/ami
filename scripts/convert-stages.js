#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const YAML = require("yaml");

const root = process.cwd();
const stagesDir = path.join(root, "constants", "stages");
const outFile = path.join(stagesDir, "stages.json");

function isYamlFile(name) {
  return name.endsWith(".yaml") || name.endsWith(".yml");
}

function readYamlFile(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const data = YAML.parse(raw);
  return data;
}

function main() {
  if (!fs.existsSync(stagesDir)) {
    console.error(`❌ Missing directory: ${path.relative(root, stagesDir)}`);
    process.exit(1);
  }

  const entries = fs
    .readdirSync(stagesDir, { withFileTypes: true })
    .filter((d) => d.isFile() && isYamlFile(d.name))
    .map((d) => d.name)
    .sort((a, b) => a.localeCompare(b));

  if (entries.length === 0) {
    console.error(`❌ No YAML files found in: ${path.relative(root, stagesDir)}`);
    process.exit(1);
  }

  const stagesById = {};

  for (const filename of entries) {
    const filePath = path.join(stagesDir, filename);
    const stage = readYamlFile(filePath);

    if (!stage || typeof stage !== "object") {
      console.error(`❌ ${filename}: YAML did not parse to an object`);
      process.exit(1);
    }

    const stageId = stage.stage_id;
    if (!stageId || typeof stageId !== "string") {
      console.error(`❌ ${filename}: missing required string field "stage_id"`);
      process.exit(1);
    }

    if (stagesById[stageId]) {
      console.error(`❌ Duplicate stage_id "${stageId}" (in ${filename})`);
      process.exit(1);
    }

    stagesById[stageId] = {
      ...stage,
      __source: path.relative(root, filePath).replaceAll("\\", "/"),
    };
  }

  fs.writeFileSync(outFile, JSON.stringify(stagesById, null, 2) + "\n", "utf8");
  console.log(`✅ Wrote ${Object.keys(stagesById).length} stage(s) to ${path.relative(root, outFile)}`);
}

main();
