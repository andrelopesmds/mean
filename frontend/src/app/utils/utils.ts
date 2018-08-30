export class Utils {

  makeCopy(obj: any) {
    return (JSON.parse(JSON.stringify(obj)));
  }

  isEqual(obj1: any, obj2: any) {
    if (JSON.stringify(obj1) == JSON.stringify(obj2)) {
      return true;
    } else {
      return false;
    }
  }
}