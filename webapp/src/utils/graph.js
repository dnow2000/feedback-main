export const edgeWithDecoration = edge => edge


const labelFromType = node => {
  const { datum, id, type } = node
  switch (type) {
    case 'Claim':
      return datum.text
    case 'Content':
      return (new URL(datum.url)).hostname
    case 'Medium':
      return datum.name
    case 'Organization':
      return datum.name
    case 'Role':
      return datum.type
    case 'Tag':
      return datum.label
    case 'User':
      return `${datum.firstName} ${datum.lastName}`
    case 'Verdict':
      return datum.title
    default:
      return id
  }
}


const sizeFromType = (node, config={}) => {
  if (node.depth === 0) {
    return  40
  }

  if (node.type === 'Content') {
    if (node.datum.totalShares) {
      return Math.log(node.datum.totalShares) + 5
    }
  }

  return 5
}


const colorsByNodeType = {
  'Appearance': '#96F',
  'AuthorContent': '#009',
  'Claim': '#F00',
  'Content': '#06F',
  'Medium': '#CF6',
  'Organization': '#CF6',
  'Role': '#FF3',
  'Tag': '#F96',
  'User': '#CF6',
  'Verdict': '#900',
  'VerdictTag': '#F63',
}

export const nodeWithDecoration = node => {
  return {
    ...node,
    color: colorsByNodeType[node.type] || '#ccc',
    x: Math.random(),
    y: Math.random(),
    label: labelFromType(node),
    size: sizeFromType(node),
  }
}
