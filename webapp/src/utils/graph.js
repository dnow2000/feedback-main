export const edgeWithDecoration = edge => edge


const labelFromNode = node => {
  const { datum, id, type } = node
  switch (type) {
    case 'Claim':
      return datum.text
    case 'Content':
      let label = `${datum.type[0].toUpperCase()}${datum.type.slice(1)}`
      if (datum.url) {
        label = datum?.url?.slice(0, Math.min(50, datum.url?.length))
      }
      if (datum.title) {
        label = `${label}: ${datum.title}`
      }
      return label
    case 'Medium':
      return `${datum.type}: ${datum.name || '***'}`
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


const sizeFromNode = node => {
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
    case 'AuthorContent':
      return '#009'
    case 'Claim':
      return '#F00'
    case 'Content':
      return node.datum.type === 'post'
             ? '#06F'
             : '#F6F'
    case 'Link':
      return '#96F'
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
    label: labelFromNode(node),
    size: sizeFromNode(node),
  }
}
