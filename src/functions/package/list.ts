import { singleton } from 'tsyringe';
import { DefaultService } from '../default.js';

@singleton()
export default class extends DefaultService {}
