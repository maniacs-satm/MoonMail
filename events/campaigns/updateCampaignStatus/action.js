'use strict';

import { Campaign } from 'moonmail-models';
import { debug } from '../../lib/index';
import { parse } from 'aws-event-parser';
import moment from 'moment';

export function respond(event, cb) {
  debug('= updateCampaignStatus.action', JSON.stringify(event));
  const campaign = parse(event)[0];
  const params = {status: campaign.status};
  if (params.status === 'sent') {
    params.sentAt = moment().unix();
  }
  Campaign.update(params, campaign.userId, campaign.campaignId)
    .then((data) => cb(null, data))
    .catch((err) => cb(err));
}
