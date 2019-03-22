export const userNormalizer = {
  isMergingDatum: true,
  normalizer: {
    userTags: {
      normalizer: {
        tag: 'tags'
      },
      stateKey: 'userTags'
    }
  },
  stateKey: 'users'
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
      user: userNormalizer
    },
    stateKey: 'reviews',
  },
  verdicts: {
    normalizer: {
      user: userNormalizer
    },
    stateKey: 'verdicts',
  }
}

export const itemReviewNormalizer = {
  evaluation: 'evaluations',
  reviewTags: {
    normalizer: {
      tag: 'tags'
    },
    stateKey: 'reviewTags'
  },
  user: userNormalizer,
}

export const reviewNormalizer = {
  article: 'articles',
  verdicts: {
    normalizer: {
      verdictUsers: 'verdictUsers'
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
      user: 'users'
    },
    stateKey: 'reviews',
  },
  user: userNormalizer,
  verdictTags: {
    normalizer: {
      tag: 'tags'
    },
    stateKey: 'verdictTags',
  },
  verdictUsers: {
    normalizer: {
      user: 'users'
    },
    stateKey: 'verdictUsers'
  }
}
