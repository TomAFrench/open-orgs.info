import { Context } from '@cryptostats/sdk'
import { getSnapshotProposals } from './snapshot'

export async function setup(sdk: Context) {
  const getTreasuryInUSD = async () => {
    const data = await sdk.http.get('https://api.decentral.games/admin/getTreasuryBalanceHistory/week')
    return data.totalBalanceUSD.graph.slice(-1)[0].secondary
  }

  sdk.register({
    id: 'decentral-games',
    queries: {
      currentTreasuryUSD: getTreasuryInUSD,
      currentLiquidTreasuryUSD: getTreasuryInUSD,
      // @ts-ignore
      currentTreasuryPortfolio: async () => [],
      recentProposals: () => getSnapshotProposals(sdk, 'decentralgames.eth'),
    },
    metadata: {
      icon: sdk.ipfs.getDataURILoader('QmcqSKKx5Xb9mxp4qUdSzwNbBUJMgHNbvfrZVhYjLwh6jd', 'image/png'),
      category: 'app',
      name: 'Decentral Games',
      website: 'https://decentral.games',
      governanceSite: 'https://snapshot.org/#/decentralgames.eth',
      governanceModel: '',
    },
  })
}

