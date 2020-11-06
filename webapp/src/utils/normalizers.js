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
  claim: 'claims',
  content: 'contents',
  testifier: userConfig,
}


export const contentNormalizer = {
  contentTags: {
    normalizer: {
      tag: 'tags'
    },
    stateKey: 'contentTags',
  },
  reviews: {
    normalizer: {
      reviewer: userConfig,
    },
    stateKey: 'reviews',
  },
  verdicts: {
    normalizer: {
      editor: userConfig,
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
  content: 'contents',
  verdicts: {
    normalizer: {
      verdictReviewers: {
        normalizer: {
          reviewer: userConfig
        },
        stateKey: 'verdictReviewers'
      }
    },
    stateKey: 'verdicts',
  },
  ...itemReviewNormalizer
}

export const verdictNormalizer = {
  content: 'contents',
  claim: {
    normalizer: {
      quotedFromAppearances: 'appearances',
    },
    stateKey: 'claims',
  },
  reviews: {
    normalizer: {
      evaluation: 'evaluations',
      reviewer: userConfig
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
  verdictReviewers: {
    normalizer: {
      reviewer: userConfig
    },
    stateKey: 'verdictReviewers'
  }
}
