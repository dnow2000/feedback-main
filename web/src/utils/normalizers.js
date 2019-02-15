export const userNormalizer = {
  isMergingDatum: true,
  key: 'users',
  userTags: {
    key: 'userTags',
    normalizer: {
      tag: 'tags'
    }
  }
}

export const articleNormalizer = {
  articleTags: {
    key: 'articleTags',
    normalizer: {
      tag: 'tags'
    }
  },
  reviews: {
    key: 'reviews',
    normalizer: {
      user: userNormalizer
    }
  },
  verdicts: {
    key: 'verdicts',
    normalizer: {
      user: userNormalizer
    }
  }
}

export const itemReviewNormalizer = {
  evaluation: 'evaluations',
  reviewTags: {
    key: 'reviewTags',
    normalizer: {
      tag: 'tags'
    }
  },
  user: userNormalizer,
}

export const reviewNormalizer = {
  article: 'articles',
  verdicts: {
    key: 'verdicts',
    normalizer: {
      verdictUsers: 'verdictUsers'
    }
  },
  ...itemReviewNormalizer
}

export const verdictNormalizer = {
  article: 'articles',
  reviews: {
    key: 'reviews',
    normalizer: {
      evaluation: 'evaluations',
      user: 'users'
    }
  },
  user: userNormalizer,
  verdictTags: {
    key: 'verdictTags',
    normalizer: {
      tag: 'tags'
    }
  },
  verdictUsers: {
    key: 'verdictUsers',
    normalizer: {
      user: 'users'
    }
  }
}
