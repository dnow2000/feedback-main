export const edgeWithDecoration = edge => edge


const sizesByNodeType = {
  'Claim': 10,
  'Content': 3
}


export const nodeWithDecoration = node => {
  const { type } = node
  return {
    ...node,
    size: sizesByNodeType[type] || node.size,
  }
}
