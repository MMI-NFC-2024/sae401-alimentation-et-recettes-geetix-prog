/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_328358686")

  // update collection data
  unmarshal({
    "name": "Pays"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_328358686")

  // update collection data
  unmarshal({
    "name": "pays"
  }, collection)

  return app.save(collection)
})
