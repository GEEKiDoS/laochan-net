import { Collection, Db } from "mongodb"
import { container } from "tsyringe"


export function col(
  collectionName: string
): PropertyDecorator {
  let col: Collection | undefined;

  return (target: object, key: string | symbol) => {
    Reflect.deleteProperty(target, key);
    Reflect.defineProperty(target, key, {
      get: () => {
        if (!col) {
          const db = container.resolve(Db);
          col = db.collection(collectionName);
        }

        return col;
      },
      enumerable: true,
      configurable: true,
    });
  }
}
