// npm install argparse axios
const axios = require('axios').default;
const { ArgumentParser } = require('argparse');

const parser = new ArgumentParser({ description: 'Check domain for availability' });
parser.add_argument('domain', {
  type: 'str',
  help: 'Domain name to be checked',
});

const { domain } = parser.parse_args();
const apiKey = 'GO_DADDY_API_KEY';
const apiSecret = 'GO_DADDY_API_SECRET';
const headers = { Authorization: `sso-key ${apiKey}:${apiSecret}` };

const getUrl = domain => `https://api.ote-godaddy.com/v1/domains/available?domain=${domain}`;

async function checkDomainAvailability(domain) {
  console.log(`Checking availability of domain ${domain}`);
  const res = await axios.get(getUrl(domain), { headers });

  if (res.status != 200) {
    console.log(`Error getting state of Domain ${domain}`);
    return;
  }

  const available = res.data.available;
  if (!available) {
    console.log(`Domain ${domain} is not available.`);
    return;
  }

  console.log(`Domain ${domain} is available for purchase`);
}

checkDomainAvailability(domain);