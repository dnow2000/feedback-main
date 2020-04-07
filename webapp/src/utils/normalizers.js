export const userNormalizer = {
  roles: 'roles',
  userTags: {
    normalizer: {
      tag: 'tags'
    },
    stateKey: 'userTags'
  }
}

export const userConfig = {
  isMergingDatum: true,
  normalizer: userNormalizer,
  stateKey: "users"
}

export const appearanceNormalizer = {
  article: 'articles',
  claim: 'claimes',
  user: userConfig,
}

export const articleNormalizer = {
  articleTags: {
    normalizer: {
      tag: 'tags'
    },
    stateKey: 'articleTags',
  },
  reviews: {
    normalizer: {
      user: userConfig,
    },
    stateKey: 'reviews',
  },
  verdicts: {
    normalizer: {
      user: userConfig,
    },
    stateKey: 'verdicts',
  }
}

export const itemReviewNormalizer = {
  evaluation: 'evaluations',
  /*
  reviewTags: {
    normalizer: {
      tag: 'tags'
    },
    stateKey: 'reviewTags'
  },
  */
  user: userConfig,
}

export const reviewNormalizer = {
  article: 'articles',
  verdicts: {
    normalizer: {
      verdictUsers: {
        normalizer: {
          user: userConfig
        },
        stateKey: 'verdictUsers'
      }
    },
    stateKey: 'verdicts',
  },
  ...itemReviewNormalizer
}

export const verdictNormalizer = {
  article: 'articles',
  reviews: {
    normalizer: {
      evaluation: 'evaluations',
      user: userConfig
    },
    stateKey: 'reviews',
  },
  user: userConfig,
  verdictTags: {
    normalizer: {
      tag: 'tags'
    },
    stateKey: 'verdictTags',
  },
  verdictUsers: {
    normalizer: {
      user: userConfig
    },
    stateKey: 'verdictUsers'
  }
}
