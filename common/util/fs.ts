import {promises as fs} from "fs"
import {resolve} from "path"

type WalkOption = {
  ext?: string[]
}

export async function* walk(dir: string, option: WalkOption = {}): AsyncGenerator<string> {
  const {ext = []} = option
  for (const dirent of await fs.readdir(dir, {withFileTypes: true})) {
    const res = resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* walk(res, option);
    } else if (ext.length === 0 || ext.some(e => res.endsWith(e))) {
      yield res;
    }
  }
}