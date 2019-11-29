const visibleFor = roleTypes =>
  currentRoles => {
    if (!roleTypes || roleTypes.length === 0) {
      return false
    }
    return roleTypes.every(roleType =>
    (currentRoles || []).map(cr => cr.type).includes(roleType))
  }

export default visibleFor
