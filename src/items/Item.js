import { Record } from 'immutable';
import moment from 'moment';

const ItemRecord = new Record({
  id: '',
  name: '',
  createdUtc: moment(),
});

export default class Item extends ItemRecord {
  constructor(args = {}) {
    const createdUtc = args.createdUtc ? moment(args.createdUtc) : moment();

    super({ ...args, createdUtc });
  }
}
