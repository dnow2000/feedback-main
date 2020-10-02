export const edgeWithDecoration = edge => edge



const labelDependingOnType = (node) => {
  
  let label = node.id;

  if (node.type === 'Claim') {
    label = node.datum.text
  } else if (node.type === 'Content') {
    label = (new URL(node.datum.url)).hostname 
  } else if (node.type === 'Medium') {
    label = node.datum.name
  } else if (node.type === 'Organization') {
    label = node.datum.name
  } else if (node.type === 'Role') {
    label = node.datum.type
  } else if (node.type === 'Tag') {
    label = node.datum.label
  } else if (node.type === 'User') {
    label = `${node.datum.firstName} ${node.datum.lastName}`
  } else if (node.type === 'Verdict') {
    label = node.datum.title
  }  else {
    label = node.id
  }

  return label;
}


const sizeDependingOnType = (node) => {
  
  let size = 5;

  if (node.type === 'Content') {
    if (node.datum.totalShares) {
      size = Math.log(node.datum.totalShares) + 5
    }
  }

  return size;
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
    x: Math.random(),
    y: Math.random(),
    label: labelDependingOnType(node),
    size: sizeDependingOnType(node),
    color: colorsByNodeType[node.type] || '#ccc',
  }
}
