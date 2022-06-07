const csv = require("csvtojson");
const fs = require("fs")

const createData = async () => {
    try {
        let db = JSON.parse(fs.readFileSync("pokemons.json"))
        let pokemons = await csv().fromFile("pokemon.csv")
        pokemons = pokemons.map((p, index) => {
            let types = []
            for (let [key, value] of Object.entries(p)) {
                console.log([key, value])
                if (key.startsWith("Type")) {
                    types.push(value.toLowerCase())
                }
            }
            return { name: p.Name, types, id: index + 1 }
        })
        let newSet = new Set(pokemons)
        pokemons = Array.from(newSet).map(pokemon => {
            return { ...pokemon, url: `http://localhost:5000/images/${pokemon.id}.png` }
        })
        db.data = pokemons
        db.totalPokemons = pokemons.length
        fs.writeFileSync("pokemons.json", JSON.stringify(db))
    } catch (err) {
        console.log(err)
    }
}
createData()