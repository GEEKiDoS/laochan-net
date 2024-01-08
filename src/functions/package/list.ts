import { kxml } from "../../decorators/render-kxml.js";
import { ILaochanService } from "../../types.js";
import { singleton } from "tsyringe";
import { DefaultService } from "../default.js";

@singleton()
export default class extends DefaultService {}
