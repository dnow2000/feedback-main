export const edgeWithDecoration = edge => edge


const labelFromNode = node => {
  const { datum, id, type } = node
  switch (type) {
    case 'Claim':
      return datum.text
    case 'Content':
      return `${datum.url.slice(0, Math.min(50, datum.url?.length))} ${datum.title}`
    case 'Medium':
      return datum.name || '***'
    case 'Organization':
      return datum.name
    case 'Platform':
      return datum.name
    case 'Role':
      return datum.type
    case 'Tag':
      return datum.label
    case 'User':
      return `${datum.firstName || '***'} ${datum.lastName || '***'}`
    case 'Verdict':
      return datum.title
    default:
      return id
  }
}


const sizeFromNode = (node, config={}) => {
  if (node.type === 'Content') {
    if (node.datum.totalShares) {
      return Math.log(node.datum.totalShares) + 5
    }
  }

  return 5
}


const colorFromNode = node => {
  const { type } = node
  switch (type) {
    case 'Appearance':
      return '#96F'
    case 'AuthorContent':
      return '#009'
    case 'Claim':
      return '#F00'
    case 'Content':
      return '#06F'
    case 'Medium':
      return '#CF6'
    case 'Organization':
      return '#407'
    case 'Role':
      return '#FF3'
    case 'Tag':
      return '#F96'
    case 'User':
      return '#CF6'
    case 'Verdict':
      return '#900'
    case 'VerdictTag':
      return '#F63'
    default:
      return '#ccc'
  }
}

export const nodeWithDecoration = node => {
  return {
    ...node,
    color: colorFromNode(node),
    x: Math.random(),
    y: Math.random(),
    label: `${node.type} : ${labelFromNode(node)}`,
    size: sizeFromNode(node),
  }
}
