



export default ({ spots, tiles  }) => {
  const cities = useMemo(() => {
    if (!spots)
    //return  <do smthing with tiles, spots>
  }, [spots, tiles])

  return {
    cities:

  }
}





const Parent = ({ tiles, spots }) => {
  const { gameId } = useParams()
  const cities = selectCitiesFromGameId(state, gameId)


  return {cities.map(city => <City city={city} />)}
}




const selectCitiesFromGameId = gameId => {
  const game = state.games.find(game => game.id)
  return f(game.spotes, game.tiles)
}
