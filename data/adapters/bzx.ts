import { Context } from '@cryptostats/sdk'
import { getSnapshotProposals } from './snapshot'

const TREASURY_ADDRESS = '0xfedC4dD5247B93feb41e899A09C44cFaBec29Cbc'

const NATIVE_TOKENS = ['0x56d811088235f11c8920698a204a5010a788f4b3', '0xb72b31907c1c95f3650b64b2469e08edacee5e8f'];

export async function setup(sdk: Context) {
  const getTreasuryInUSD = async () => {
    const treasuryValue = await sdk.plugins.getPlugin('zerion').getTotalValue(TREASURY_ADDRESS)
    return treasuryValue
  }

  const getPortfolio = async () => {
    const portfolio = await sdk.plugins.getPlugin('zerion').getPortfolio(TREASURY_ADDRESS)

    const withVesting = portfolio
      .map((portfolioItem: any) => (
        {
          ...portfolioItem,
          native: NATIVE_TOKENS.includes(portfolioItem.address),
          vesting: portfolioItem.symbol === 'vBZRX'
        }
      ))

    return withVesting
  }

  const getLiquidTreasuryInUSD = async () => {
    const portfolio = await getPortfolio()

    const liquidTreasury = portfolio
      .filter((item: any) => item.symbol !== 'vBZRX')
      .reduce((acc: number, item: any) => acc + item.value, 0)

    return liquidTreasury
  }

  sdk.register({
    id: 'bzx',
    queries: {
      currentTreasuryUSD: getTreasuryInUSD,
      currentLiquidTreasuryUSD: getLiquidTreasuryInUSD,
      currentTreasuryPortfolio: getPortfolio,
      recentProposals: () => getSnapshotProposals(sdk, 'bzx.eth'),
    },
    metadata: {
      name: 'bZx',
      icon: sdk.ipfs.getDataURILoader('QmVwmVxRL9PBJKoeVEMdnGLEdvNnsgEfJqNn5tywaRTTK5', 'image/svg+xml'),
      website: 'https://bzx.network',
      governanceForum: 'https://forum.bzx.network',
      governanceSite: 'https://snapshot.org/#/bzx.eth',
      treasuries: [TREASURY_ADDRESS],
    },
  })
}
