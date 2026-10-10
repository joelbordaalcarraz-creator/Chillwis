import { mkdir, readdir, stat } from "node:fs/promises"

import path from "node:path"

import { fileURLToPath } from "node:url"

import sharp from "sharp"

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
)

const sourceRoot = path.join(projectRoot, "image-sources")

const outputRoot = path.join(projectRoot, "public")

const supportedExtensions = new Set([".png", ".jpg", ".jpeg"])

const maxDimension = 1600

const quality = 76

async function collectImages(directory) {
  const entries = await readdir(directory, { withFileTypes: true })

  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name)

      return entry.isDirectory() ? collectImages(entryPath) : [entryPath]
    }),
  )

  return files.flat()
}

const sourceFiles = (await collectImages(sourceRoot)).filter((file) =>
  supportedExtensions.has(path.extname(file).toLowerCase()),
)

if (sourceFiles.length === 0) {
  throw new Error(`No PNG or JPEG source images found in ${sourceRoot}`)
}

let sourceBytes = 0

let outputBytes = 0

for (const sourcePath of sourceFiles) {
  const relativePath = path.relative(sourceRoot, sourcePath)

  const destinationPath = path.join(
    outputRoot,

    relativePath.replace(/\.(png|jpe?g)$/i, ".webp"),
  )

  const sourceSize = (await stat(sourcePath)).size

  await mkdir(path.dirname(destinationPath), { recursive: true })

  const result = await sharp(sourcePath)

    .rotate()

    .resize({
      width: maxDimension,

      height: maxDimension,

      fit: "inside",

      withoutEnlargement: true,
    })

    .webp({ quality, effort: 6, alphaQuality: 80, smartSubsample: true })

    .toFile(destinationPath)

  sourceBytes += sourceSize

  outputBytes += result.size

  console.log(
    `${relativePath}: ${(sourceSize / 1024).toFixed(0)} KB -> ${(result.size / 1024).toFixed(0)} KB`,
  )
}

const reduction = ((1 - outputBytes / sourceBytes) * 100).toFixed(1)

console.log(
  `Optimized ${sourceFiles.length} images: ${(sourceBytes / 1024 / 1024).toFixed(2)} MB -> ${(outputBytes / 1024 / 1024).toFixed(2)} MB (${reduction}% smaller)`,
)
