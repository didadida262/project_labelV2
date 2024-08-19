export const pluginStatus = [
  { value: 'all', label: 'All Status' },
  { value: 'installed', label: 'Installed' },
  { value: 'notInstalled', label: 'Uninstalled' }
];

export const ProjectStatusOptions = [
  {
    value: 'ALL',
    label: 'All Status'
  },
  {
    value: 'ACTIVE',
    label: 'Active'
  },
  {
    value: 'INACTIVE',
    label: 'Inactive'
  }
];

export enum EChainType {
  'Ethereum' = 'ethereum',
  'Arbitrum' = 'arbitrum',
  'BnbChain' = 'binance',
  'Polygon' = 'polygon',
  'Nervos' = 'nervos',
  'Flow' = 'flow',
  'Conflux' = 'conflux',
  'Dfinity' = 'dfinity',
  'Aptos' = 'aptos',
  'Chain33' = 'chain33',
  'AntChain' = 'ant',
  'FiscoBcos' = 'fisco',
  'AstarEvm' = 'astar-evm',
  'AstarWasm' = 'astar-wasm',
  'Sui' = 'sui',
  'Xdc' = 'xdc',
  'Iris' = 'iris',
  /**
   * 要和后端确认，选择全部链如何传值，传空还是all
   */
  'All' = 'all'
}
// 如果要新增某条链的支持，直接在这里配置就可以
export const allowExportChain = [
  EChainType.Ethereum,
  EChainType.Sui,
  EChainType.Arbitrum,
  EChainType.Polygon,
  EChainType.BnbChain,
  EChainType.Conflux,
  EChainType.Nervos
];

export const ChainNameMap = {
  [EChainType.All]: 'All',
  [EChainType.Ethereum]: 'Ethereum',
  [EChainType.Arbitrum]: 'Arbitrum',
  [EChainType.BnbChain]: 'BNB Chain',
  [EChainType.Polygon]: 'Polygon',
  [EChainType.Nervos]: 'Nervos',
  [EChainType.Flow]: 'Flow',
  [EChainType.Conflux]: 'Conflux',
  [EChainType.Dfinity]: 'Internet Computer',
  [EChainType.Aptos]: 'Aptos',
  [EChainType.Chain33]: 'Chain33',
  [EChainType.AntChain]: 'Ant Chain',
  [EChainType.FiscoBcos]: 'FISCO BCOS',
  [EChainType.AstarEvm]: 'Astar EVM',
  [EChainType.AstarWasm]: 'Astar WASM',
  [EChainType.Sui]: 'Sui',
  [EChainType.Xdc]: 'XDC',
  [EChainType.Iris]: 'IRISnet'
};

export const EPagePath = {
  ProjectListPage: '/projects',
  ProjectCreatePage: '/projects/create',
  TemplateListPage: '/templates',
  PublicTemplateListPage: '/templates/public',
  PrivateTemplateListPage: '/templates/private',
  ExtensionsListPage: '/plugins',
  AuthCallbackCenterPage: '/authCallbackCenter',
  LearnPage: '/learn',
  BilingPage: '/biling'
};

export const websitePathPrefix = '/dashboard';

export const TagSearchParams = {
  /**
   * 付费方案，目前有free和paid两种
   */
  PRICE: 'price',
  /**
   * 链
   */
  CHAIN: 'chain',

  /**
   * 标签，只有插件搜索才需要这个参数，模板没有
   */
  CATEGORY: 'category',
  STATUS: 'status'
};

export const OtherSearchParams = {
  /**
   * 搜索关键字
   */
  QUERY: 'query',

  /**
   * 排序字段
   */
  SORT: 'sort',
  /**
   * 是否显示advanced search
   */
  SHOW_ADVANCED_SEARCH: 'showAdvancedSearch'
};

export const HomeSearchParams = {
  /**
   * 搜索关键字
   */
  QUERY: 'query',
  /**
   * 搜索类型
   */
  SEARCH_TYPE: 'search_type'
};

export const SearchParams = { ...TagSearchParams, ...OtherSearchParams };
