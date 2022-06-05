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
                    types.push(value)
                }
            }
            return { name: p.Name[0].toUpperCase() + p.Name.slice(1), types, index: index + 1 }
        })
        let newSet = new Set(pokemons)
        pokemons = Array.from(newSet).map(pokemon => {
            console.log(pokemon)
            return { ...pokemon, url: `http://localhost:5000/images/${pokemon.index}.png` }
        })
        db.data = pokemons
        db.totalPokemons = pokemons.length
        fs.writeFileSync("pokemons.json", JSON.stringify(db))
    } catch (err) {
        console.log(err)
    }
}
createData()