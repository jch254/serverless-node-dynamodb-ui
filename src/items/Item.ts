import * as moment from 'moment';

export interface ItemArgs {
  id: string;
  name: string;
  createdUtc?: string;
}

const defaultItemArgs: ItemArgs = {
  id: '',
  name: '',
};

export default class Item {
  id: string;
  name: string;
  createdUtc: moment.Moment;

  constructor(args: ItemArgs = defaultItemArgs) {
    this.id = args.id;
    this.name = args.name;
    this.createdUtc = args.createdUtc !== undefined ? moment(args.createdUtc) : moment().utc();
  }
}
